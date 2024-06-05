import { Injectable } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import {
    EditPersonRoleData,
    DetailedPerson,
    Person,
    PersonContact,
    PersonContactType,
    PersonRole,
    PersonSkill,
    PersonTeam,
    SearchPeopleParams,
    EditPersonSkillData,
    EditPersonContactData,
} from '@domaindocs/types';
import { PrismaService } from '../../shared/prisma.service';
import { v4 } from 'uuid';
import { EditPersonAboutMeData } from '../../../../shared/types/src/person/edit-person-about-me-data';

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
                contacts: true,
            },
        });

        return results.map(
            (p) =>
                new DetailedPerson(
                    new Person(
                        p.user.userId,
                        p.user.firstName,
                        p.user.lastName,
                        p.aboutMe,
                        p.dateJoined.toISOString(),
                        p.user.iconUri,
                    ),
                    p.contacts.map(
                        (c) => new PersonContact(c.contactId, c.type as PersonContactType, c.description, c.href),
                    ),
                    p.skills.map((s) => new PersonSkill(s.skill.skillId, s.skill.name)),
                    p.teamMembers.map((t) => new PersonTeam(t.team.teamId, t.team.name, t.team.iconUri)),
                    p.roles.map((r) => new PersonRole(r.role.roleId, r.role.name, r.isPrimary)),
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
                contacts: true,
            },
        });

        return new DetailedPerson(
            new Person(
                result.user.userId,
                result.user.firstName,
                result.user.lastName,
                result.aboutMe,
                result.dateJoined.toISOString(),
                result.user.iconUri,
            ),
            result.contacts.map(
                (c) => new PersonContact(c.contactId, c.type as PersonContactType, c.description, c.href),
            ),
            result.skills.map((s) => new PersonSkill(s.skill.skillId, s.skill.name)),
            result.teamMembers.map((t) => new PersonTeam(t.team.teamId, t.team.name, t.team.iconUri)),
            result.roles.map((r) => new PersonRole(r.role.roleId, r.role.name, r.isPrimary)),
        );
    }

    async createSkill(
        session: UserSession,
        domainId: string,
        userId: string,
        data: EditPersonSkillData,
    ): Promise<DetailedPerson> {
        await this.prisma.personSkill.create({
            data: {
                domainId,
                userId,
                skillId: data.skillId,
            },
        });

        return this.getPerson(session, domainId, userId);
    }

    async deleteSkill(
        session: UserSession,
        domainId: string,
        userId: string,
        skillId: string,
    ): Promise<DetailedPerson> {
        await this.prisma.personSkill.delete({
            where: {
                userId_skillId: {
                    userId,
                    skillId,
                },
            },
        });

        return this.getPerson(session, domainId, userId);
    }

    async createRole(
        session: UserSession,
        domainId: string,
        userId: string,
        data: EditPersonRoleData,
    ): Promise<DetailedPerson> {
        await this.prisma.$transaction(async (tx) => {
            if (data.isPrimary) {
                await tx.personRole.updateMany({
                    where: {
                        domainId,
                        userId,
                        isPrimary: true,
                    },
                    data: {
                        isPrimary: false,
                    },
                });
            }

            await tx.personRole.create({
                data: {
                    domainId,
                    userId,
                    roleId: data.roleId,
                    isPrimary: data.isPrimary,
                },
            });
        });

        return this.getPerson(session, domainId, userId);
    }

    async updateRole(
        session: UserSession,
        domainId: string,
        userId: string,
        roleId: string,
        data: EditPersonRoleData,
    ): Promise<DetailedPerson> {
        await this.prisma.$transaction(async (tx) => {
            if (data.isPrimary) {
                await tx.personRole.updateMany({
                    where: {
                        domainId,
                        userId,
                        isPrimary: true,
                    },
                    data: {
                        isPrimary: false,
                    },
                });
            }

            await tx.personRole.update({
                where: {
                    userId_roleId: {
                        userId,
                        roleId,
                    },
                },
                data: {
                    roleId: data.roleId,
                    isPrimary: data.isPrimary,
                },
            });
        });

        return this.getPerson(session, domainId, userId);
    }

    async deleteRole(session: UserSession, domainId: string, userId: string, roleId: string): Promise<DetailedPerson> {
        const role = await this.prisma.personRole.findUniqueOrThrow({
            where: {
                userId_roleId: {
                    userId,
                    roleId,
                },
            },
        });

        await this.prisma.$transaction(async (tx) => {
            await tx.personRole.delete({
                where: {
                    userId_roleId: {
                        userId,
                        roleId,
                    },
                },
            });

            if (role.isPrimary) {
                const firstAvailableRole = await tx.personRole.findFirst({
                    where: {
                        userId,
                        domainId,
                    },
                });

                if (firstAvailableRole) {
                    await tx.personRole.update({
                        where: {
                            userId_roleId: {
                                roleId: firstAvailableRole.roleId,
                                userId: firstAvailableRole.userId,
                            },
                        },
                        data: {
                            isPrimary: true,
                        },
                    });
                }
            }
        });

        return this.getPerson(session, domainId, userId);
    }

    async createContact(
        session: UserSession,
        domainId: string,
        userId: string,
        data: EditPersonContactData,
    ): Promise<DetailedPerson> {
        await this.prisma.personContact.create({
            data: {
                domainId,
                userId,
                contactId: v4(),
                description: data.description,
                href: data.href,
                type: data.type,
            },
        });

        return this.getPerson(session, domainId, userId);
    }

    async updateContact(
        session: UserSession,
        domainId: string,
        userId: string,
        contactId: string,
        data: EditPersonContactData,
    ): Promise<DetailedPerson> {
        await this.prisma.personContact.update({
            where: {
                contactId,
            },
            data: {
                description: data.description,
                href: data.href,
                type: data.type,
            },
        });

        return this.getPerson(session, domainId, userId);
    }

    async deleteContact(
        session: UserSession,
        domainId: string,
        userId: string,
        contactId: string,
    ): Promise<DetailedPerson> {
        await this.prisma.personContact.delete({
            where: {
                contactId,
            },
        });

        return this.getPerson(session, domainId, userId);
    }

    async updateAboutMe(
        session: UserSession,
        domainId: string,
        userId: string,
        data: EditPersonAboutMeData,
    ): Promise<DetailedPerson> {
        await this.prisma.person.update({
            where: {
                userId_domainId: {
                    domainId,
                    userId,
                },
            },
            data: {
                aboutMe: data.aboutMe,
            },
        });

        return this.getPerson(session, domainId, userId);
    }
}
