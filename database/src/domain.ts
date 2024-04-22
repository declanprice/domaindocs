import { pgTable, uniqueIndex, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';
import { person } from './person';
import { subdomain } from './subdomain';

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

export const domainRelations = relations(domain, ({ many }) => ({
  people: many(person),
  subdomains: many(subdomain),
}));
