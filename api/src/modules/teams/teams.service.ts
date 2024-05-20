import { Injectable } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import { v4 } from 'uuid';
import { DetailedTeam, CreateTeamData, SearchTeamParams, Team, TeamMember, TeamProject } from '@domaindocs/lib';
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
                    new Team(t.teamId, t.name, t.iconUri),
                    t.members.map(
                        (p) =>
                            new TeamMember(
                                p.userId,
                                p.person.user.firstName,
                                p.person.user.lastName,
                                p.person.user.iconUri,
                            ),
                    ),
                    t.projectOwnership.map((p) => new TeamProject(p.projectId, p.project.name)),
                ),
        );
    }

    async createTeam(session: UserSession, domainId: string, dto: CreateTeamData) {
        await this.prisma.team.create({
            data: {
                teamId: v4(),
                domainId,
                name: dto.name,
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
            new Team(result.teamId, result.name, result.iconUri),
            result.members.map(
                (m) => new TeamMember(m.userId, m.person.user.firstName, m.person.user.lastName, m.person.user.iconUri),
            ),
            result.projectOwnership.map((p) => new TeamProject(p.projectId, p.project.name)),
        );
    }
}
