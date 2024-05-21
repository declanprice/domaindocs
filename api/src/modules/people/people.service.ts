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
import { UpdatePersonSkillsData } from '../../../../shared/lib/src/person/update-person-skills-data';
import { UpdatePersonContactDetailsData } from '../../../../shared/lib/src/person/update-person-contact-details-data';
import { UpdatePersonRolesData } from '../../../../shared/lib/src/person/update-person-roles-data';

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
                    p.skills.map((s) => new PersonSkill(s.skill.skillId, s.skill.name)),
                    p.teamMembers.map((t) => new PersonTeam(t.team.teamId, t.team.name, t.team.iconUri)),
                    p.roles.map((r) => new PersonRole(r.role.roleId, r.role.name)),
                ),
        );
    }

    async getPerson(session: UserSession, domainId: string, userId: string): Promise<DetailedPerson> {
        const result = await this.prisma.person.findFirstOrThrow({
            where: {
                domainId: domainId,
                userId,
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

        return new DetailedPerson(
            new Person(result.user.userId, result.user.firstName, result.user.lastName, result.user.iconUri, null),
            new PersonContact(
                result.contactDetails.personalMobile,
                result.contactDetails.personalEmail,
                result.contactDetails.workEmail,
                result.contactDetails.workMobile,
            ),
            result.skills.map((s) => new PersonSkill(s.skill.skillId, s.skill.name)),
            result.teamMembers.map((t) => new PersonTeam(t.team.teamId, t.team.name, t.team.iconUri)),
            result.roles.map((r) => new PersonRole(r.role.roleId, r.role.name)),
        );
    }

    async updateSkills(
        session: UserSession,
        domainId: string,
        userId: string,
        data: UpdatePersonSkillsData,
    ): Promise<void> {
        await this.prisma.$transaction(async (tx) => {
            await tx.personSkill.deleteMany({
                where: {
                    userId,
                    domainId,
                },
            });

            await tx.personSkill.createMany({
                data: data.skillIds.map((skillId) => ({
                    skillId,
                    userId,
                    domainId,
                })),
            });
        });
    }

    async updateRoles(
        session: UserSession,
        domainId: string,
        userId: string,
        data: UpdatePersonRolesData,
    ): Promise<void> {
        await this.prisma.$transaction(async (tx) => {
            await tx.personRole.deleteMany({
                where: {
                    userId,
                    domainId,
                },
            });

            await tx.personRole.createMany({
                data: data.roleIds.map((roleId) => ({
                    roleId,
                    userId,
                    domainId,
                })),
            });
        });
    }

    async updateContactDetails(
        session: UserSession,
        domainId: string,
        userId: string,
        data: UpdatePersonContactDetailsData,
    ): Promise<void> {
        await this.prisma.personContactDetails.upsert({
            where: {
                userId_domainId: {
                    domainId,
                    userId,
                },
            },
            create: {
                domainId,
                userId,
                workMobile: data.workMobile,
                workEmail: data.workEmail,
                personalEmail: data.personalEmail,
                personalMobile: data.personalMobile,
            },
            update: {
                domainId,
                userId,
                workMobile: data.workMobile,
                workEmail: data.workEmail,
                personalEmail: data.personalEmail,
                personalMobile: data.personalMobile,
            },
        });
    }
}
