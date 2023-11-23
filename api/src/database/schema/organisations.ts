import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { varchar } from 'drizzle-orm/pg-core';

export const organisations = pgTable('organisations', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),
  name: varchar('name').notNull(),
  summary: varchar('summary').notNull(),
});
