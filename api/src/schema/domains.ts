import { pgTable, uuid } from 'drizzle-orm/pg-core'
import { jsonb, varchar } from 'drizzle-orm/pg-core'

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
    domainId: uuid('domain_id')
        .notNull()
        .references(() => domains.id),
    userId: uuid('user_ud')
        .notNull()
        .references(() => users.id)
})

export const domainUserProfiles = pgTable('domain_user_profiles', {
    id: uuid('id').notNull().defaultRandom().primaryKey(),
    domainId: uuid('domain_id')
        .notNull()
        .references(() => domains.id),
    firstName: varchar('first_name').notNull(),
    lastName: varchar('last_name').notNull(),
    role: varchar('role').notNull().default('Employee'),
    contactEmail: varchar('contact_email').notNull(),
    contactNumber: varchar('contact_number').notNull(),
    aboutMe: varchar('about_me').notNull(),
    skills: jsonb('skills').notNull().$type<string[]>().default([])
})
