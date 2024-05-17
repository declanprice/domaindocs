import { pgTable, text, index, primaryKey, foreignKey } from 'drizzle-orm/pg-core';
import { domain, skill, teamMember, user } from './index';
import { relations } from 'drizzle-orm/relations';
import { role } from './role';

export const person = pgTable(
    'person',
    {
        userId: text('user_id')
            .notNull()
            .references(() => user.userId, {
                onDelete: 'restrict',
                onUpdate: 'cascade',
            }),
        domainId: text('domain_id')
            .notNull()
            .references(() => domain.domainId, {
                onDelete: 'restrict',
                onUpdate: 'cascade',
            }),
    },
    (table) => {
        return {
            personPkey: primaryKey({
                columns: [table.userId, table.domainId],
                name: 'person_pkey',
            }),
            userIdIdx: index('person_user_id_idx').on(table.userId),
            domainIdIdx: index('person_domain_id_idx').on(table.domainId),
        };
    },
);

export const personContactDetails = pgTable(
    'person_contact_details',
    {
        userId: text('user_id').notNull(),
        domainId: text('domain_id')
            .notNull()
            .references(() => domain.domainId, {
                onDelete: 'restrict',
                onUpdate: 'cascade',
            }),
        personalMobile: text('personal_mobile'),
        personalEmail: text('personal_email'),
        workEmail: text('work_email'),
        workMobile: text('work_mobile'),
    },
    (table) => {
        return {
            personPkey: primaryKey({
                columns: [table.userId, table.domainId],
                name: 'person_contact_details_pkey',
            }),
            domainIdIdx: index('person_contact_details_domain_id_idx').on(table.domainId),
        };
    },
);

export const personSkill = pgTable(
    'person_skill',
    {
        userId: text('user_id').notNull(),
        skillId: text('skill_id')
            .notNull()
            .references(() => skill.skillId, {
                onDelete: 'restrict',
                onUpdate: 'cascade',
            }),
        domainId: text('domain_id')
            .notNull()
            .references(() => domain.domainId, {
                onDelete: 'restrict',
                onUpdate: 'cascade',
            }),
    },
    (table) => {
        return {
            personSkillPkey: primaryKey({
                columns: [table.userId, table.skillId],
                name: 'person_skill_pkey',
            }),
            personFkey: foreignKey({
                columns: [table.userId, table.domainId],
                foreignColumns: [person.userId, person.domainId],
                name: 'person_skill_person_fkey',
            })
                .onUpdate('cascade')
                .onDelete('restrict'),
            domainIdIdx: index('person_skill_domain_id_idx').on(table.domainId),
        };
    },
);

export const personRole = pgTable(
    'person_role',
    {
        userId: text('user_id').notNull(),
        roleId: text('skill_id')
            .notNull()
            .references(() => role.roleId, {
                onDelete: 'restrict',
                onUpdate: 'cascade',
            }),
        domainId: text('domain_id')
            .notNull()
            .references(() => domain.domainId, {
                onDelete: 'restrict',
                onUpdate: 'cascade',
            }),
    },
    (table) => {
        return {
            personSkillPkey: primaryKey({
                columns: [table.userId, table.roleId],
                name: 'person_role_pkey',
            }),
            personFkey: foreignKey({
                columns: [table.userId, table.domainId],
                foreignColumns: [person.userId, person.domainId],
                name: 'person_role_person_fkey',
            })
                .onUpdate('cascade')
                .onDelete('restrict'),
            domainIdIdx: index('person_role_domain_id_idx').on(table.domainId),
        };
    },
);

export const personRelations = relations(person, ({ one, many }) => ({
    user: one(user, {
        fields: [person.userId],
        references: [user.userId],
    }),
    domain: one(domain, {
        fields: [person.domainId],
        references: [domain.domainId],
    }),
    contactDetails: one(personContactDetails, {
        fields: [person.userId],
        references: [personContactDetails.userId],
    }),
    skills: many(personSkill),
    roles: many(personRole),
    teamMembers: many(teamMember),
}));

export const personContactDetailsRelations = relations(personContactDetails, ({ one }) => ({
    person: one(person, {
        fields: [personContactDetails.userId],
        references: [person.userId],
    }),
}));

export const personRoleRelations = relations(personRole, ({ one }) => ({
    person: one(person, {
        fields: [personRole.userId],
        references: [person.userId],
    }),
    role: one(role, {
        fields: [personRole.roleId],
        references: [role.roleId],
    }),
}));

export const personSkillRelations = relations(personSkill, ({ one }) => ({
    person: one(person, {
        fields: [personSkill.userId],
        references: [person.userId],
    }),
    skill: one(skill, {
        fields: [personSkill.skillId],
        references: [skill.skillId],
    }),
}));
