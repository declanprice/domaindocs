import { Inject, Injectable } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import { v4 } from 'uuid';
import {
    DetailedTeamDto,
    CreateTeamDto,
    SearchTeamDto,
    TeamDto,
    TeamSubdomainDto,
    TeamMemberDto,
    TeamProjectDto,
} from '@domaindocs/lib';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '@domaindocs/database';
import { team } from '@domaindocs/database';
import { eq } from 'drizzle-orm';

@Injectable()
export class TeamsService {
    constructor(@Inject('DB') private db: PostgresJsDatabase<typeof schema>) {}

    async searchByDomain(session: UserSession, domainId: string, dto: SearchTeamDto): Promise<DetailedTeamDto[]> {
        let where = eq(team.domainId, domainId);

        if (dto.subdomainId) {
            where = eq(team.subdomainId, dto.subdomainId);
        }

        const result = await this.db.query.team.findMany({
            where: where,
            with: {
                subdomain: true,
                members: {
                    with: {
                        person: {
                            with: {
                                user: true,
                            },
                        },
                    },
                },
                projects: true,
            },
        });

        return result.map(
            (t) =>
                new DetailedTeamDto(
                    new TeamDto(t.teamId, t.name, t.iconUri),
                    new TeamSubdomainDto(t.subdomainId, t.subdomain.name),
                    t.members.map(
                        (p) =>
                            new TeamMemberDto(
                                p.personId,
                                p.person.user.firstName,
                                p.person.user.lastName,
                                p.person.user.iconUri,
                            ),
                    ),
                    t.projects.map((p) => new TeamProjectDto(p.projectId, p.name)),
                ),
        );
    }

    async createTeam(session: UserSession, domainId: string, dto: CreateTeamDto) {
        await this.db.insert(team).values({
            teamId: v4(),
            subdomainId: dto.subdomainId,
            domainId,
            name: dto.name,
        });
    }
}
