import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  username: uuid('username').notNull().primaryKey(),
  email: varchar('email').notNull(),
  firstName: varchar('first_name ').notNull(),
  lastName: varchar('last_name ').notNull(),
});

export type User = typeof users.$inferSelect;
