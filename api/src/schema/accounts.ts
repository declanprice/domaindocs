import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core'

export const accounts = pgTable('accounts', {
    id: uuid('id').notNull().primaryKey(),
    email: varchar('email').notNull(),
    firstName: varchar('first_name ').notNull(),
    lastName: varchar('last_name ').notNull()
})
