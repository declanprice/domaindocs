import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core'

import { organisations } from './organisations'

export const domains = pgTable('domains', {
    id: uuid('id').notNull().defaultRandom().primaryKey(),
    organisationId: uuid('organisation_id')
        .notNull()
        .references(() => organisations.id),
    name: varchar('name').notNull()
})
