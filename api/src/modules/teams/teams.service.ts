import { Injectable, NotFoundException } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import { v4 } from 'uuid';
import {
    DetailedTeam,
    CreateTeamData,
    SearchTeamParams,
    Team,
    TeamMember,
    AddTeamMemberData,
    ContactType,
    EditDescriptionData,
    UpdateNameData,
    Contact,
    Link,
    EditLinkData,
} from '@domaindocs/types';
import { PrismaService } from '../../shared/prisma.service';

@Injectable()
export class TeamsService {
    constructor(private prisma: PrismaService) {}

    async searchByDomain(session: UserSession, domainId: string, params: SearchTeamParams): Promise<DetailedTeam[]> {
        const query: any = {
            domainId,
        };

        if (params.name != '') {
            query.name = { contains: params.name, mode: 'insensitive' };
        }

        const results = await this.prisma.team.findMany({
            where: query,
            include: {
                members: {
                    include: {
                        person: {
                            include: {
                                user: true,
                                roles: {
                                    include: {
                                        role: true,
                                    },
                                },
                            },
                        },
                    },
                },
                contacts: true,
                links: true,
            },
        });

        return results.map(
            (t) =>
                new DetailedTeam(
                    new Team(t.teamId, t.name, t.description, t.dateFormed.toISOString(), t.iconUri),
                    t.members.map(
                        (p) =>
                            new TeamMember(
                                p.userId,
                                p.person.user.firstName,
                                p.person.user.lastName,
                                p.person.user.iconUri,
                                p.person.roles.map((p) => ({
                                    roleId: p.roleId,
                                    roleName: p.role.name,
                                })),
                            ),
                    ),
                    t.contacts.map((c) => new Contact(c.contactId, c.type as ContactType, c.description, c.href)),
                    t.links.map((link) => new Link(link.linkId, link.href, link.description)),
                ),
        );
    }

    async createTeam(session: UserSession, domainId: string, data: CreateTeamData) {
        await this.prisma.team.create({
            data: {
                teamId: v4(),
                domainId,
                name: data.name,
            },
        });
    }

    async getTeam(session: UserSession, domainId: string, teamId: string) {
        const result = await this.prisma.team.findFirstOrThrow({
            where: {
                teamId,
            },
            include: {
                members: {
                    include: {
                        person: {
                            include: {
                                user: true,
                                roles: {
                                    include: {
                                        role: true,
                                    },
                                },
                            },
                        },
                    },
                },
                contacts: true,
                links: true,
            },
        });

        return new DetailedTeam(
            new Team(result.teamId, result.name, result.description, result.dateFormed.toISOString(), result.iconUri),
            result.members.map(
                (m) =>
                    new TeamMember(
                        m.userId,
                        m.person.user.firstName,
                        m.person.user.lastName,
                        m.person.user.iconUri,
                        m.person.roles.map((p) => ({
                            roleId: p.roleId,
                            roleName: p.role.name,
                        })),
                    ),
            ),
            result.contacts.map((c) => new Contact(c.contactId, c.type as ContactType, c.description, c.href)),
            result.links.map((link) => new Link(link.linkId, link.href, link.description)),
        );
    }

    async removeTeam(session: UserSession, domainId: string, teamId: string) {
        const result = await this.prisma.team.findUnique({
            where: {
                domainId,
                teamId,
            },
        });

        if (!result) {
            throw new NotFoundException(`team ${teamId} does not exist`);
        }

        await this.prisma.team.delete({
            where: {
                domainId,
                teamId,
            },
        });
    }

    async updateName(session: UserSession, domainId: string, teamId: string, data: UpdateNameData) {
        await this.prisma.team.update({
            where: {
                teamId,
            },
            data: {
                name: data.name,
            },
        });

        return this.getTeam(session, domainId, teamId);
    }

    async updateDescription(session: UserSession, domainId: string, teamId: string, data: EditDescriptionData) {
        await this.prisma.team.update({
            where: {
                domainId,
                teamId,
            },
            data: {
                description: data.description,
            },
        });

        return this.getTeam(session, domainId, teamId);
    }

    async addMember(session: UserSession, domainId: string, teamId: string, data: AddTeamMemberData) {
        await this.prisma.teamMember.create({
            data: {
                domainId,
                teamId,
                userId: data.userId,
            },
        });

        return this.getTeam(session, domainId, teamId);
    }

    async removeMember(session: UserSession, domainId: string, teamId: string, userId: string) {
        await this.prisma.teamMember.delete({
            where: {
                teamId_userId: {
                    teamId,
                    userId,
                },
            },
        });

        return this.getTeam(session, domainId, teamId);
    }

    async addLink(session: UserSession, domainId: string, teamId: string, data: EditLinkData) {
        await this.prisma.teamLink.create({
            data: {
                domainId,
                teamId,
                linkId: v4(),
                href: data.href,
                description: data.description,
            },
        });

        return this.getTeam(session, domainId, teamId);
    }

    async updateLink(session: UserSession, domainId: string, teamId: string, linkId: string, data: EditLinkData) {
        await this.prisma.teamLink.update({
            where: {
                teamId,
                linkId,
            },
            data: {
                href: data.href,
                description: data.description,
            },
        });

        return this.getTeam(session, domainId, teamId);
    }

    async removeLink(session: UserSession, domainId: string, teamId: string, linkId: string) {
        await this.prisma.teamLink.delete({
            where: {
                teamId,
                linkId,
            },
        });

        return this.getTeam(session, domainId, teamId);
    }
}
