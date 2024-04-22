import { Inject, Injectable } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import {
  DetailedPersonDto,
  PersonDto,
  PersonSkillDto,
  PersonTeamDto,
  SearchPeopleDto,
} from '@domaindocs/lib';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '@domaindocs/database';
import { and, eq, ilike } from 'drizzle-orm';
import {
  person,
  personSkill,
  skill,
  subdomain,
  team,
  teamMember,
  user,
} from '@domaindocs/database';

@Injectable()
export class PeopleService {
  constructor(@Inject('DB') private db: PostgresJsDatabase<typeof schema>) {}

  async searchPeople(
    session: UserSession,
    domainId: string,
    dto: SearchPeopleDto,
  ): Promise<DetailedPersonDto[]> {
    const whereClauses = [eq(person.domainId, domainId)];

    if (dto.name) {
      whereClauses.push(ilike(user.fullName, `%${dto.name}%`));
    }

    if (dto.subdomainId) {
      whereClauses.push(eq(team.subdomainId, dto.subdomainId));
    }

    const result = await this.db
      .select()
      .from(person)
      .leftJoin(user, eq(user.userId, person.userId))
      .leftJoin(personSkill, eq(personSkill.personId, person.personId))
      .leftJoin(skill, eq(skill.skillId, personSkill.skillId))
      .leftJoin(teamMember, eq(teamMember.personId, person.personId))
      .leftJoin(team, eq(team.teamId, teamMember.teamId))
      .leftJoin(subdomain, eq(subdomain.subdomainId, team.subdomainId))
      .where(and(...whereClauses));

    const dtoMap = new Map<string, DetailedPersonDto>();

    for (const person of result) {
      const personId = person.person.personId;

      let dto =
        dtoMap.get(personId) ||
        new DetailedPersonDto(
          new PersonDto(
            person.person.personId,
            person.user.userId,
            person.user.firstName,
            person.user.lastName,
            {
              contactEmail: person.person.contactEmail,
              contactMobile: person.person.contactMobile,
              personalContactMobile: person.person.personalContactMobile,
              personalContactEmail: person.person.personalContactEmail,
            },
            person.user.iconUri,
            person.team_member.role,
          ),
          [],
          undefined,
        );

      if (person.team) {
        dto.team = new PersonTeamDto(
          person.team.teamId,
          person.team.name,
          person.subdomain.name,
        );
      }

      if (person.skill) {
        dto.skills.push(
          new PersonSkillDto(
            person.skill.skillId,
            person.skill.name,
            person.skill.description,
          ),
        );
      }

      dtoMap.set(personId, dto);
    }

    return Array.from(dtoMap.values());
  }
}
