import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
    id: uuid('id').notNull().primaryKey(),
    email: varchar('email').notNull(),
    displayName: varchar('display_name ').notNull()
})
