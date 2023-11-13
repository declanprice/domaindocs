import { pgTable, uuid, varchar, jsonb } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
    id: uuid('id').notNull().primaryKey(),
    email: varchar('email').notNull(),
    displayName: varchar('display_name ').notNull(),
    aboutMe: varchar('about_me').notNull(),
    skills: jsonb('skills').notNull().$type<string[]>().default([])
})
