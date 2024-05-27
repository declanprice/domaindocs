import { BadRequestException, Injectable } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import { createSlug } from '../../util/create-slug';
import { Domain, DomainSettings, DomainSettingsPerson, SendDomainInviteData, SetupDomainData } from '@domaindocs/types';
import { PrismaService } from '../../shared/prisma.service';
import { EmailService } from '../../shared/services/email.service';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class DomainsService {
    constructor(
        private prisma: PrismaService,
        private emailService: EmailService,
        private authService: AuthService,
    ) {}

    async setupDomain(session: UserSession, dto: SetupDomainData) {
        await this.prisma.$transaction(async (tx) => {
            const domainId = createSlug(dto.domainName);

            await tx.domain.create({
                data: {
                    domainId,
                    name: dto.domainName,
                },
            });

            await tx.person.create({
                data: {
                    domainId,
                    userId: session.userId,
                },
            });
        });
    }

    async sendInvite(session: UserSession, domainId: string, data: SendDomainInviteData) {
        const user = await this.prisma.user.findFirst({
            where: {
                email: data.email,
            },
        });

        if (user) {
            const person = await this.prisma.person.findFirst({
                where: {
                    userId: user.userId,
                    domainId: domainId,
                },
            });

            if (person) {
                throw new BadRequestException('person has already joined the domain');
            }

            await this.prisma.person.create({
                data: {
                    userId: user.userId,
                    domainId,
                },
            });

            return;
        }

        const invite = await this.prisma.domainInvite.findFirst({
            where: {
                email: data.email,
            },
        });

        if (invite) {
            throw new BadRequestException('invite is already pending for provided email');
        }

        const domain = await this.prisma.domain.findUniqueOrThrow({
            where: {
                domainId,
            },
        });

        await this.prisma.domainInvite.create({
            data: {
                domainId: domainId,
                email: data.email,
            },
        });

        const link = await this.authService.createMagicLink(data.email);

        await this.emailService.sendInvite(data.email, domain.name, link);
    }

    async getSettings(session: UserSession, domainId: string): Promise<DomainSettings> {
        const result = await this.prisma.domain.findUniqueOrThrow({
            where: {
                domainId,
            },
            include: {
                people: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        return new DomainSettings(
            new Domain(result.domainId, result.name),
            result.people.map(
                (p) =>
                    new DomainSettingsPerson(
                        p.userId,
                        p.user.firstName,
                        p.user.lastName,
                        p.user.email,
                        false,
                        p.user.iconUri,
                    ),
            ),
        );
    }
}
