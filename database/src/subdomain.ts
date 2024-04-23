import { pgTable, uniqueIndex, text, index } from 'drizzle-orm/pg-core';
import { domain, person, team } from './index';
import { relations } from 'drizzle-orm/relations';
import { contact } from './contact';
import { resourceLink } from './resource-link';

export const subdomain = pgTable(
    'subdomain',
    {
        subdomainId: text('subdomain_id').primaryKey().notNull(),
        domainId: text('domain_id')
            .notNull()
            .references(() => domain.domainId, {
                onDelete: 'restrict',
                onUpdate: 'cascade',
            }),
        name: text('name').notNull(),
        description: text('description').default('').notNull(),
    },
    (table) => {
        return {
            nameKey: uniqueIndex('subdomain_name_key').on(table.name),
            domainIdIdx: index('subdomain_domain_id_idx').on(table.domainId),
        };
    },
);

export const subdomainRelations = relations(subdomain, ({ one, many }) => ({
    domain: one(domain, {
        fields: [subdomain.domainId],
        references: [domain.domainId],
    }),
    contacts: many(contact),
    resourceLinks: many(resourceLink),
    teams: many(team),
}));
