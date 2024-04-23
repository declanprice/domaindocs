import { pgTable, uniqueIndex, text } from 'drizzle-orm/pg-core';
import { domain, project } from './index';
import { relations } from 'drizzle-orm/relations';

export const technology = pgTable(
    'technology',
    {
        technologyId: text('technology_id').primaryKey().notNull(),
        name: text('name').notNull(),
        domainId: text('domain_id')
            .notNull()
            .references(() => domain.domainId, {
                onDelete: 'restrict',
                onUpdate: 'cascade',
            }),
    },
    (table) => {
        return {
            domainIdNameKey: uniqueIndex('technology_domain_id_name_key').on(table.name, table.domainId),
        };
    },
);

export const technologyRelations = relations(technology, ({ one, many }) => ({
    domain: one(domain, {
        fields: [technology.domainId],
        references: [domain.domainId],
    }),
    projects: many(project),
}));
