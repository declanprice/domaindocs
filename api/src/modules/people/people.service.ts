import { Injectable } from '@nestjs/common';
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
import { PrismaService } from '../../shared/prisma.service';

@Injectable()
export class PeopleService {
    constructor(private prisma: PrismaService) {}

    async searchPeople(session: UserSession, domainId: string, params: SearchPeopleParams): Promise<DetailedPerson[]> {
        const results = await this.prisma.person.findMany({
            where: {
                domainId: domainId,
                user: {
                    fullName: params.name ? { contains: 'Dec' } : undefined,
                },
            },
            include: {
                user: true,
                skills: {
                    include: {
                        skill: true,
                    },
                },
                roles: {
                    include: {
                        role: true,
                    },
                },
                teamMembers: {
                    include: {
                        team: true,
                    },
                },
                contactDetails: true,
            },
        });

        return results.map(
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
    }
}
