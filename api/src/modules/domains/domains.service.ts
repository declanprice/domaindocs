import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import { createSlug } from '../../util/create-slug';
import {
    Contact,
    ContactType,
    DetailedDomain,
    Domain,
    DomainSettings,
    EditContactData,
    EditLinkData,
    Link,
    SearchDomainUsersParams,
    SendDomainInviteData,
    SetupDomainData,
    UpdateNameData,
    DomainUser,
    SearchDomainInvitesParams,
    DomainInvite,
    PagedResult,
    EditDescriptionData,
} from '@domaindocs/types';
import { PrismaService } from '../../shared/prisma.service';
import { EmailService } from '../../shared/services/email.service';
import { AuthService } from '../../auth/auth.service';
import { v4 } from 'uuid';
import { differenceInMinutes } from 'date-fns';

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

    async searchUsers(session: UserSession, domainId: string, params: SearchDomainUsersParams) {
        const query: any = {
            domainId,
        };

        if (params.search) {
            query.user = {
                OR: [
                    {
                        fullName: {
                            contains: params.search.toLowerCase(),
                            mode: 'insensitive',
                        },
                    },
                    {
                        email: {
                            contains: params.search.toLowerCase(),
                            mode: 'insensitive',
                        },
                    },
                ],
            };
        }

        const result = await this.prisma.person.findMany({
            where: query,
            include: {
                user: true,
            },
            take: params.take,
            skip: params.offset,
            orderBy: {
                user: {
                    fullName: 'asc',
                },
            },
        });

        const total = await this.prisma.person.count({
            where: query,
        });

        return {
            data: result.map(
                (p) => new DomainUser(p.userId, p.user.email, p.user.firstName, p.user.lastName, p.user.iconUri, false),
            ),
            total,
        };
    }

    async searchInvites(
        session: UserSession,
        domainId: string,
        params: SearchDomainInvitesParams,
    ): Promise<PagedResult<DomainInvite>> {
        const query: any = {
            domainId,
        };

        if (params.search) {
            query.email = {
                contains: params.search.toLowerCase(),
                mode: 'insensitive',
            };
        }

        const result = await this.prisma.domainInvite.findMany({
            where: query,
            take: params.take,
            skip: params.offset,
        });

        const total = await this.prisma.domainInvite.count({
            where: query,
        });

        return {
            data: result.map((i) => new DomainInvite(i.domainId, i.email, i.dateSent.toISOString())),
            total,
        };
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
                throw new BadRequestException('user has already joined the domain');
            } else {
                await this.prisma.person.create({
                    data: {
                        userId: user.userId,
                        domainId: domainId,
                    },
                });
            }
        }

        const invite = await this.prisma.domainInvite.findFirst({
            where: {
                domainId: domainId,
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
                dateSent: new Date(),
            },
        });

        const link = await this.authService.createMagicLink(data.email);

        await this.emailService.sendInvite(data.email, domain.name, link);
    }

    async resendInvite(session: UserSession, domainId: string, email: string) {
        const invite = await this.prisma.domainInvite.findFirst({
            where: {
                domainId: domainId,
                email: email,
            },
        });

        if (!invite) {
            throw new BadRequestException('invite does not exist');
        }

        const domain = await this.prisma.domain.findUniqueOrThrow({
            where: {
                domainId,
            },
        });

        if (differenceInMinutes(invite.dateSent, new Date()) > 10) {
            throw new BadRequestException('invite has already been sent recently');
        }

        const link = await this.authService.createMagicLink(email);

        await this.emailService.sendInvite(email, domain.name, link);

        await this.prisma.domainInvite.update({
            where: {
                domainId,
                email,
            },
            data: {
                dateSent: new Date(),
            },
        });
    }

    async removeInvite(session: UserSession, domainId: string, email: string): Promise<void> {
        await this.prisma.domainInvite.delete({
            where: {
                domainId,
                email,
            },
        });
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
                    new Contact(
                        contact.contactId,
                        contact.type as ContactType,
                        contact.description,
                        contact.reason,
                        contact.href,
                    ),
            ),
            result.links.map((link) => new Link(link.linkId, link.href, link.description)),
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
        );
    }

    async updateName(session: UserSession, domainId: string, data: UpdateNameData) {
        await this.prisma.domain.update({
            where: {
                domainId,
            },
            data: {
                name: data.name,
            },
        });
    }

    async updateDescription(session: UserSession, domainId: string, data: EditDescriptionData) {
        await this.prisma.domain.update({
            where: {
                domainId,
            },
            data: {
                description: data.description,
            },
        });

        return this.getDomain(session, domainId);
    }

    async addContact(session: UserSession, domainId: string, data: EditContactData) {
        await this.prisma.domainContact.create({
            data: {
                domainId,
                contactId: v4(),
                type: data.type,
                href: data.href,
                reason: data.reason,
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
                reason: data.reason,
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

    async addLink(session: UserSession, domainId: string, data: EditLinkData) {
        await this.prisma.domainLink.create({
            data: {
                domainId,
                linkId: v4(),
                href: data.href,
                description: data.description,
            },
        });

        return this.getDomain(session, domainId);
    }

    async updateLink(session: UserSession, domainId: string, linkId: string, data: EditLinkData) {
        await this.prisma.domainLink.update({
            where: {
                domainId,
                linkId,
            },
            data: {
                href: data.href,
                description: data.description,
            },
        });

        return this.getDomain(session, domainId);
    }

    async removeLink(session: UserSession, domainId: string, linkId: string) {
        await this.prisma.domainLink.delete({
            where: {
                domainId,
                linkId,
            },
        });

        return this.getDomain(session, domainId);
    }

    async delete(session: UserSession, domainId: string) {}
}
