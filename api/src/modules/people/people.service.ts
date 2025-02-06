import { Injectable } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import {
    EditPersonRoleData,
    DetailedPerson,
    Person,
    PersonRole,
    PersonSkill,
    PersonTeam,
    SearchPeopleParams,
    EditPersonSkillData,
    SearchPerson,
    PagedResult,
    EditContactData,
    Contact,
    ContactType,
    EditDescriptionData,
} from '@domaindocs/types';
import { PrismaService } from '../../shared/prisma.service';
import { v4 } from 'uuid';

@Injectable()
export class PeopleService {
    constructor(private prisma: PrismaService) {}

    async searchPeople(
        session: UserSession,
        domainId: string,
        params: SearchPeopleParams,
    ): Promise<PagedResult<SearchPerson>> {
        const query = {
            domainId: domainId,
            user: {
                fullName: params.name ? { contains: params.name } : undefined,
            },
        };

        const results = await this.prisma.person.findMany({
            where: query,
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
            },
            take: params.take,
            skip: params.offset,
        });

        const total = await this.prisma.person.count({
            where: query,
        });

        const data = results.map(
            (p) =>
                new SearchPerson(
                    new Person(
                        p.user.userId,
                        p.user.firstName,
                        p.user.lastName,
                        p.description,
                        p.dateJoined.toISOString(),
                        p.user.email,
                        p.user.iconUri,
                    ),
                    p.skills.map((s) => new PersonSkill(s.skill.skillId, s.skill.name)),
                    p.roles.map((r) => new PersonRole(r.role.roleId, r.role.name, r.isPrimary)),
                ),
        );

        return {
            data,
            total,
        };
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
                result.description,
                result.dateJoined.toISOString(),
                result.user.email,
                result.user.iconUri,
            ),
            result.contacts.map(
                (c) => new Contact(c.contactId, c.type as ContactType, c.description, c.reason, c.href),
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

    async addContact(
        session: UserSession,
        domainId: string,
        userId: string,
        data: EditContactData,
    ): Promise<DetailedPerson> {
        await this.prisma.personContact.create({
            data: {
                domainId,
                userId,
                contactId: v4(),
                description: data.description,
                reason: data.reason,
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
        data: EditContactData,
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

    async removeContact(
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

    async updateDescription(
        session: UserSession,
        domainId: string,
        userId: string,
        data: EditDescriptionData,
    ): Promise<DetailedPerson> {
        await this.prisma.person.update({
            where: {
                userId_domainId: {
                    domainId,
                    userId,
                },
            },
            data: {
                description: data.description,
            },
        });

        return this.getPerson(session, domainId, userId);
    }
}
