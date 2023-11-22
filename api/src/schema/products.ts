import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core'

import { domains } from './domains'

export const products = pgTable('products', {
    id: uuid('id').notNull().defaultRandom().primaryKey(),
    domainId: uuid('domain_id')
        .notNull()
        .references(() => domains.id),
    name: varchar('name').notNull(),
    summary: varchar('summary')
})
