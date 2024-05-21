import { Injectable } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import { v4 } from 'uuid';
import {
    DetailedTeam,
    CreateTeamData,
    SearchTeamParams,
    Team,
    TeamMember,
    TeamProject,
    UpdateTeamSummaryData,
    UpdateTeamMembersData,
} from '@domaindocs/lib';
import { PrismaService } from '../../shared/prisma.service';

@Injectable()
export class TeamsService {
    constructor(private prisma: PrismaService) {}

    async searchByDomain(session: UserSession, domainId: string, dto: SearchTeamParams): Promise<DetailedTeam[]> {
        const results = await this.prisma.team.findMany({
            where: {
                domainId,
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
                projectOwnership: {
                    include: {
                        project: true,
                    },
                },
            },
        });

        return results.map(
            (t) =>
                new DetailedTeam(
                    new Team(t.teamId, t.name, t.description, t.iconUri),
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
                    t.projectOwnership.map((p) => new TeamProject(p.projectId, p.project.name)),
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
                projectOwnership: {
                    include: {
                        project: true,
                    },
                },
            },
        });

        return new DetailedTeam(
            new Team(result.teamId, result.name, result.description, result.iconUri),
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
            result.projectOwnership.map((p) => new TeamProject(p.projectId, p.project.name)),
        );
    }

    async updateSummary(session: UserSession, domainId: string, teamId: string, data: UpdateTeamSummaryData) {
        await this.prisma.team.update({
            where: {
                teamId,
            },
            data: {
                description: data.description,
            },
        });
    }

    async updateMembers(session: UserSession, domainId: string, teamId: string, data: UpdateTeamMembersData) {
        await this.prisma.$transaction(async (tx) => {
            for (const userId of data.userIds) {
                await tx.teamMember.upsert({
                    where: {
                        teamId_userId: {
                            teamId,
                            userId,
                        },
                    },
                    create: {
                        domainId,
                        userId,
                        teamId,
                    },
                    update: {
                        domainId,
                        userId,
                        teamId,
                    },
                });
            }

            await tx.teamMember.deleteMany({
                where: {
                    domainId,
                    teamId,
                    userId: {
                        not: { in: data.userIds },
                    },
                },
            });
        });
    }
}
