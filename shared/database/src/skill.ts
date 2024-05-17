import { pgTable, uniqueIndex, text, index } from 'drizzle-orm/pg-core';
import { domain, personSkill } from './index';
import { relations } from 'drizzle-orm/relations';

export const skill = pgTable(
    'skill',
    {
        skillId: text('skill_id').primaryKey().notNull(),
        domainId: text('domain_id')
            .notNull()
            .references(() => domain.domainId, {
                onDelete: 'restrict',
                onUpdate: 'cascade',
            }),
        name: text('name').notNull(),
        description: text('description').notNull(),
    },
    (table) => {
        return {
            domainIdIdx: index('skill_domain_id_index').on(table.domainId),
            domainIdNameIdx: uniqueIndex('skill_domain_id_name_index').on(table.name, table.domainId),
        };
    },
);

export const skillRelations = relations(skill, ({ many }) => ({
    people: many(personSkill),
}));