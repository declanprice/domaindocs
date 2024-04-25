import { Inject, Injectable } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import { v4 } from 'uuid';
import { DetailedTeamDto, CreateTeamDto, SearchTeamDto, TeamDto, TeamMemberDto, TeamProjectDto } from '@domaindocs/lib';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '@domaindocs/database';
import { team } from '@domaindocs/database';
import { eq } from 'drizzle-orm';

@Injectable()
export class TeamsService {
    constructor(@Inject('DB') private db: PostgresJsDatabase<typeof schema>) {}

    async searchByDomain(session: UserSession, domainId: string, dto: SearchTeamDto): Promise<DetailedTeamDto[]> {
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
                new DetailedTeamDto(
                    new TeamDto(t.teamId, t.name, t.iconUri),
                    t.members.map(
                        (p) =>
                            new TeamMemberDto(
                                p.personId,
                                p.person.user.firstName,
                                p.person.user.lastName,
                                p.person.user.iconUri,
                            ),
                    ),
                    t.ownership.map((p) => new TeamProjectDto(p.projectId, p.project.name)),
                ),
        );
    }

    async createTeam(session: UserSession, domainId: string, dto: CreateTeamDto) {
        await this.db.insert(team).values({
            teamId: v4(),
            domainId,
            name: dto.name,
        });
    }
}
