import { pgTable, uuid } from 'drizzle-orm/pg-core'

export const subscriptions = pgTable('subscriptions', {
    id: uuid('id').notNull().defaultRandom().primaryKey()
})
