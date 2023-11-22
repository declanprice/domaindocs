import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core'
import { accounts } from './accounts'
import { organisations } from './organisations'

export const people = pgTable('people', {
    id: uuid('id').notNull().defaultRandom().primaryKey(),
    organisationId: uuid('organisation_id')
        .notNull()
        .references(() => organisations.id),
    accountId: uuid('account_id')
        .notNull()
        .references(() => accounts.id),
    role: varchar('role').notNull().default('Employee'),
    contactEmail: varchar('contact_email').notNull(),
    contactNumber: varchar('contact_number').notNull(),
    contactLocation: varchar('contact_location').notNull()
})
