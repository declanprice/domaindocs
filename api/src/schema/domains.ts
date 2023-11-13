import { pgTable, uuid } from 'drizzle-orm/pg-core'
import { varchar } from 'drizzle-orm/pg-core'

import { users } from './users'
import { documentation } from './documentation'

export const domains = pgTable('domains', {
    id: uuid('id').notNull().defaultRandom().primaryKey(),
    domainName: varchar('domain_name').notNull(),
    name: varchar('name').notNull(),
    documentationId: uuid('documentation_id')
        .notNull()
        .references(() => documentation.id)
})

export const domainUsers = pgTable('domain_users', {
    id: uuid('id').notNull().defaultRandom().primaryKey(),
    domainId: uuid('domain_id')
        .notNull()
        .references(() => domains.id),
    userId: uuid('user_id')
        .notNull()
        .references(() => users.id),
    role: varchar('role').notNull().default('Employee'),
    contactEmail: varchar('contact_email').notNull(),
    contactNumber: varchar('contact_number').notNull()
})
