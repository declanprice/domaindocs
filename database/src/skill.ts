import { pgTable, uniqueIndex, text, index, foreignKey, primaryKey } from 'drizzle-orm/pg-core';
import { documentation, domain, person, personSkill } from './index';
import { relations } from 'drizzle-orm/relations';

export const skill = pgTable(
    'skill',
    {
        skillId: text('skill_id').primaryKey().notNull(),
        name: text('name').notNull(),
        description: text('description').notNull(),
        domainId: text('domain_id')
            .notNull()
            .references(() => domain.domainId, {
                onDelete: 'restrict',
                onUpdate: 'cascade',
            }),
    },
    (table) => {
        return {
            domainIdNameKey: uniqueIndex('skill_domain_id_name_key').on(table.name, table.domainId),
        };
    },
);

export const skillRelations = relations(skill, ({ many }) => ({
    people: many(personSkill),
}));
