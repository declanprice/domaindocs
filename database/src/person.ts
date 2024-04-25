import { pgTable, text, index, primaryKey } from 'drizzle-orm/pg-core';
import { domain, skill, teamMember, user } from './index';
import { relations } from 'drizzle-orm/relations';

export const person = pgTable(
    'person',
    {
        personId: text('person_id').primaryKey().notNull(),
        userId: text('user_id')
            .notNull()
            .references(() => user.userId),
        domainId: text('domain_id')
            .notNull()
            .references(() => domain.domainId),
        personalContactMobile: text('personal_contact_mobile'),
        personalContactEmail: text('personal_contact_email'),
        contactEmail: text('contact_email'),
        contactMobile: text('contact_mobile'),
        role: text('role').notNull().default('Employee'),
    },
    (table) => {
        return {
            userIdIdx: index('person_user_id_idx').on(table.userId),
            domainIdIdx: index('person_domain_id_idx').on(table.domainId),
        };
    },
);

export const personSkill = pgTable(
    'person_skill',
    {
        personId: text('person_id')
            .notNull()
            .references(() => person.personId, {
                onDelete: 'restrict',
                onUpdate: 'cascade',
            }),
        skillId: text('skill_id')
            .notNull()
            .references(() => skill.skillId, {
                onDelete: 'restrict',
                onUpdate: 'cascade',
            }),
    },
    (table) => {
        return {
            personSkillPkey: primaryKey({
                columns: [table.personId, table.skillId],
                name: 'person_skill_pkey',
            }),
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
    skills: many(personSkill),
    teamMember: one(teamMember, {
        fields: [person.personId],
        references: [teamMember.personId],
    }),
}));

export const personSkillRelations = relations(personSkill, ({ one }) => ({
    person: one(person, {
        fields: [personSkill.personId],
        references: [person.personId],
    }),
    skill: one(skill, {
        fields: [personSkill.skillId],
        references: [skill.skillId],
    }),
}));
