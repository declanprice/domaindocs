import { pgTable, uniqueIndex, text, index } from 'drizzle-orm/pg-core';
import { domain, personSkill } from './index';
import { relations } from 'drizzle-orm/relations';

export const role = pgTable(
    'role',
    {
        roleId: text('role_id').primaryKey().notNull(),
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
            domainIdIdx: index('role_domain_id_idx').on(table.domainId),
            domainIdNameIdx: uniqueIndex('role_domain_id_name_idx').on(table.name, table.domainId),
        };
    },
);

export const roleRelations = relations(role, ({ many }) => ({
    people: many(personSkill),
}));
