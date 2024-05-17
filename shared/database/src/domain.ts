import { pgTable, uniqueIndex, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';
import { person } from './person';
import { documentation, documentationFile } from './documentation';

export const domain = pgTable(
    'domain',
    {
        domainId: text('domain_id').primaryKey().notNull(),
        name: text('name').notNull(),
    },
    (table) => {
        return {
            nameKey: uniqueIndex('domain_name_key').on(table.name),
        };
    },
);

export const domainRelations = relations(domain, ({ one, many }) => ({
    people: many(person),
    documentation: one(documentation, {
        fields: [domain.domainId],
        references: [documentation.documentationId],
    }),
    files: many(documentationFile),
}));
