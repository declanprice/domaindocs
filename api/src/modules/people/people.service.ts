import { Inject, Injectable } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import {
    DetailedPerson,
    Person,
    PersonContact,
    PersonRole,
    PersonSkill,
    PersonTeam,
    SearchPeopleParams,
} from '@domaindocs/lib';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '@domaindocs/database';
import { and, eq, ilike } from 'drizzle-orm';
import {
    person,
    personContactDetails,
    personRole,
    personSkill,
    role,
    skill,
    team,
    teamMember,
    user,
} from '@domaindocs/database';

@Injectable()
export class PeopleService {
    constructor(@Inject('DB') private db: PostgresJsDatabase<typeof schema>) {}

    async searchPeople(session: UserSession, domainId: string, params: SearchPeopleParams): Promise<DetailedPerson[]> {
        const result = await this.db.query.person.findMany({
            where: and(eq(person.domainId, domainId), ilike(p)),
            with: {
                user: true,
                skills: {
                    with: {
                        skill: true,
                    },
                },
                roles: {
                    with: {
                        role: true,
                    },
                },
                teamMembers: {
                    with: {
                        team: true,
                    },
                },
                contactDetails: true,
            },
        });

        console.log(result);

        return result.map(
            (p) =>
                new DetailedPerson(
                    new Person(p.user.userId, p.user.firstName, p.user.lastName, p.user.iconUri, null),
                    new PersonContact(
                        p.contactDetails.personalMobile,
                        p.contactDetails.personalEmail,
                        p.contactDetails.workEmail,
                        p.contactDetails.workMobile,
                    ),
                    p.skills.map((s) => new PersonSkill(s.skill.skillId, s.skill.name, s.skill.description)),
                    p.teamMembers.map((t) => new PersonTeam(t.team.teamId, t.team.name, t.team.iconUri)),
                    p.roles.map((r) => new PersonRole(r.role.roleId, r.role.name, r.role.description)),
                ),
        );

        // const whereClauses = [eq(person.domainId, domainId)];
        //
        // if (params.name) {
        //     whereClauses.push(ilike(user.fullName, `%${params.name}%`));
        // }
        //
        // const result = await this.db
        //     .select()
        //     .from(person)
        //     .leftJoin(user, eq(user.userId, person.userId))
        //     .leftJoin(personContactDetails, eq(personContactDetails.userId, person.userId))
        //     .leftJoin(
        //         personSkill,
        //         and(eq(personSkill.userId, person.userId), eq(personSkill.domainId, person.domainId)),
        //     )
        //     .leftJoin(skill, eq(skill.skillId, personSkill.skillId))
        //     .leftJoin(personRole, and(eq(personRole.userId, person.userId), eq(personRole.domainId, person.domainId)))
        //     .leftJoin(role, eq(role.roleId, personRole.roleId))
        //     .leftJoin(teamMember, and(eq(teamMember.userId, person.userId), eq(teamMember.domainId, person.domainId)))
        //     .leftJoin(team, eq(team.teamId, teamMember.teamId))
        //     .where(and(...whereClauses));
        //
        // console.log(result);
        //
        // return [];
        // const dtos = result.reduce<Map<string, DetailedPerson>>((acc, row) => {
        //     let dto: DetailedPerson = acc.get(row.person.userId);
        //
        //     if (!dto) {
        //         dto = new DetailedPerson(
        //             new Person(row.user.userId, row.user.firstName, row.user.lastName, row.user.iconUri, null),
        //             null,
        //             [],
        //             [],
        //             [],
        //         );
        //
        //         acc.set(row.person.userId, dto);
        //     }
        //
        //     console.log(row);
        //
        //     if (row.team) {
        //         dto.teams.push(new PersonTeam(row.team.teamId, row.team.name, ''));
        //     }
        //
        //     if (row.skill) {
        //         dto.skills.push(new PersonSkill(row.skill.skillId, row.skill.name, row.skill.description));
        //     }
        //
        //     if (row.role) {
        //         dto.roles.push(new PersonRole(row.role.roleId, row.role.name, row.role.description));
        //     }
        //
        //     if (row.person_contact_details) {
        //         dto.contact = new PersonContact(
        //             row.person_contact_details.personalMobile,
        //             row.person_contact_details.personalEmail,
        //             row.person_contact_details.workEmail,
        //             row.person_contact_details.workMobile,
        //         );
        //     }
        //
        //     return acc;
        // }, new Map<string, DetailedPerson>());
        //
        // return Array.from(dtos.values());
    }
}
