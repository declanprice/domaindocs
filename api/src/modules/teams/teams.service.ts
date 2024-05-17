import { Inject, Injectable } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import { v4 } from 'uuid';
import { DetailedTeam, CreateTeamData, SearchTeamParams, Team, TeamMember, TeamProject } from '@domaindocs/lib';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '@domaindocs/database';
import { team } from '@domaindocs/database';
import { eq } from 'drizzle-orm';

@Injectable()
export class TeamsService {
    constructor(@Inject('DB') private db: PostgresJsDatabase<typeof schema>) {}

    async searchByDomain(session: UserSession, domainId: string, dto: SearchTeamParams): Promise<DetailedTeam[]> {
        const result = await this.db.query.team.findMany({
            where: eq(team.domainId, domainId),
            with: {
                members: {
                    with: {
                        person: {
                            with: {
                                user: true,
                            },
                        },
                    },
                },
                ownership: {
                    with: {
                        project: true,
                    },
                },
            },
        });

        return result.map(
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
                    t.ownership.map((p) => new TeamProject(p.projectId, p.project.name)),
                ),
        );
    }

    async createTeam(session: UserSession, domainId: string, dto: CreateTeamData) {
        await this.db.insert(team).values({
            teamId: v4(),
            domainId,
            name: dto.name,
        });
    }

    async getTeam(session: UserSession, domainId: string, teamId: string) {
        const result = await this.db.query.team.findFirst({
            where: eq(team.teamId, teamId),
            with: {
                members: {
                    with: {
                        person: {
                            with: {
                                user: true,
                            },
                        },
                    },
                },
                ownership: {
                    with: {
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
            result.ownership.map((p) => new TeamProject(p.projectId, p.project.name)),
        );
    }
}
