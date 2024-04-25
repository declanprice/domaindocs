import { Inject, Injectable } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import { DetailedPersonDto, PersonDto, PersonSkillDto, PersonTeamDto, SearchPeopleDto } from '@domaindocs/lib';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '@domaindocs/database';
import { and, eq, ilike } from 'drizzle-orm';
import { person, personSkill, skill, team, teamMember, user } from '@domaindocs/database';

@Injectable()
export class PeopleService {
    constructor(@Inject('DB') private db: PostgresJsDatabase<typeof schema>) {}

    async searchPeople(session: UserSession, domainId: string, dto: SearchPeopleDto): Promise<DetailedPersonDto[]> {
        const whereClauses = [eq(person.domainId, domainId)];

        if (dto.name) {
            whereClauses.push(ilike(user.fullName, `%${dto.name}%`));
        }

        const result = await this.db
            .select()
            .from(person)
            .leftJoin(user, eq(user.userId, person.userId))
            .leftJoin(personSkill, eq(personSkill.personId, person.personId))
            .leftJoin(skill, eq(skill.skillId, personSkill.skillId))
            .leftJoin(teamMember, eq(teamMember.personId, person.personId))
            .leftJoin(team, eq(team.teamId, teamMember.teamId))
            .where(and(...whereClauses));

        const dtos = result.reduce<Map<string, DetailedPersonDto>>((acc, row) => {
            let dto: DetailedPersonDto = acc.get(row.person.personId);

            if (!dto) {
                dto = new DetailedPersonDto(
                    new PersonDto(
                        row.person.personId,
                        row.user.userId,
                        row.user.firstName,
                        row.user.lastName,
                        {
                            contactEmail: row.person.contactEmail,
                            contactMobile: row.person.contactMobile,
                            personalContactMobile: row.person.personalContactMobile,
                            personalContactEmail: row.person.personalContactEmail,
                        },
                        row.user.iconUri,
                        row.person.role,
                    ),
                    [],
                    [],
                );

                acc.set(row.person.personId, dto);
            }

            if (row.team_member) {
                dto.teams.push(new PersonTeamDto(row.team.teamId, row.team.name));
            }

            if (row.person_skill) {
                dto.skills.push(new PersonSkillDto(row.skill.skillId, row.skill.name, row.skill.description));
            }

            return acc;
        }, new Map<string, DetailedPersonDto>());

        return Array.from(dtos.values());
    }
}
