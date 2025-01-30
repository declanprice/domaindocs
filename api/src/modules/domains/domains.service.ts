import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import { createSlug } from '../../util/create-slug';
import {
    ContactType,
    DetailedDomain,
    Domain,
    DomainContact,
    DomainLink,
    DomainSettings,
    DomainSettingsPerson,
    EditContactData,
    EditDomainContactData,
    EditDomainDescriptionData,
    EditTeamLinkData,
    SendDomainInviteData,
    SetupDomainData,
    UpdateDomainNameData,
} from '@domaindocs/types';
import { PrismaService } from '../../shared/prisma.service';
import { EmailService } from '../../shared/services/email.service';
import { AuthService } from '../../auth/auth.service';
import { v4 } from 'uuid';

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
                    description: '',
                    dateCreated: new Date(),
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

    async getDomain(session: UserSession, domainId: string): Promise<DetailedDomain> {
        const result = await this.prisma.domain.findUniqueOrThrow({
            where: {
                domainId,
            },
            include: {
                links: true,
                contacts: true,
            },
        });

        if (!result) {
            throw new NotFoundException();
        }

        return new DetailedDomain(
            new Domain(result.domainId, result.name, result.description, result.dateCreated.toISOString()),
            result.contacts.map(
                (contact) =>
                    new DomainContact(
                        contact.contactId,
                        contact.type as ContactType,
                        contact.description,
                        contact.href,
                    ),
            ),
            result.links.map((link) => new DomainLink(link.linkId, link.href, link.description)),
        );
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
            new Domain(result.domainId, result.name, result.description, result.dateCreated.toISOString()),
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

    async updateDescription(session: UserSession, domainId: string, data: EditDomainDescriptionData) {}

    async addContact(session: UserSession, domainId: string, data: EditContactData) {
        await this.prisma.domainContact.create({
            data: {
                domainId,
                contactId: v4(),
                type: data.type,
                href: data.href,
                reason: '',
                description: data.description,
            },
        });

        return this.getDomain(session, domainId);
    }

    async updateContact(session: UserSession, domainId: string, contactId: string, data: EditContactData) {
        await this.prisma.domainContact.update({
            where: {
                domainId,
                contactId,
            },
            data: {
                type: data.type,
                href: data.href,
                reason: '',
                description: data.description,
            },
        });

        return this.getDomain(session, domainId);
    }

    async removeContact(session: UserSession, domainId: string, contactId: string) {
        await this.prisma.domainContact.delete({
            where: {
                domainId,
                contactId,
            },
        });

        return this.getDomain(session, domainId);
    }

    async addLink(session: UserSession, domainId: string, dto: EditTeamLinkData) {}

    async updateLink(session: UserSession, domainId: string, linkId: string, dto: EditTeamLinkData) {}

    async removeLink(session: UserSession, domainId: string, linkId: string) {}

    async delete(session: UserSession, domainId: string) {}
}
