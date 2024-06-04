import { BadRequestException, Injectable } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import { createSlug } from '../../util/create-slug';
import {
    Domain,
    DomainSettings,
    DomainSettingsPerson,
    SendDomainInviteData,
    SetupDomainData,
    UpdateDomainNameData,
} from '@domaindocs/types';
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

    async updateName(session: UserSession, domainId: string, data: UpdateDomainNameData) {
        await this.prisma.domain.update({
            where: {
                domainId,
            },
            data: {
                name: data.domainName,
            },
        });
    }

    async delete(session: UserSession, domainId: string) {
        await this.prisma.$transaction(async (tx) => {
            await tx.onboardingGuideProgress.deleteMany({ where: { domainId } });
            await tx.onboardingGuideStep.deleteMany({ where: { domainId } });
            await tx.onboardingGuide.deleteMany({ where: { domainId } });
            await tx.documentationFile.deleteMany({ where: { domainId } });
            await tx.documentationDocument.deleteMany({ where: { domainId } });
            await tx.documentation.deleteMany({ where: { domainId } });
            await tx.projectLink.deleteMany({ where: { domainId } });
            await tx.projectOwnership.deleteMany({ where: { domainId } });
            await tx.project.deleteMany({ where: { domainId } });
            await tx.teamMember.deleteMany({ where: { domainId } });
            await tx.team.deleteMany({ where: { domainId } });
            await tx.personContactLink.deleteMany({ where: { domainId } });
            await tx.personSkill.deleteMany({ where: { domainId } });
            await tx.personRole.deleteMany({ where: { domainId } });
            await tx.person.deleteMany({ where: { domainId } });
            await tx.role.deleteMany({ where: { domainId } });
            await tx.skill.deleteMany({ where: { domainId } });
            await tx.domainInvite.deleteMany({ where: { domainId } });
            await tx.domain.deleteMany();
        });
    }
}
