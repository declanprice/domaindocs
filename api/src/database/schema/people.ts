import { pgTable, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core';
import { users } from './users';
import { organisations } from './organisations';

export const people = pgTable(
  'people',
  {
    id: uuid('id').notNull().defaultRandom().primaryKey(),
    organisationId: uuid('organisation_id')
      .notNull()
      .references(() => organisations.id),
    username: uuid('username')
      .notNull()
      .references(() => users.username),
    role: varchar('role').notNull().default('Employee'),
    contactEmail: varchar('contact_email').notNull(),
    contactNumber: varchar('contact_number').notNull(),
    contactLocation: varchar('contact_location').notNull(),
  },
  (table) => {
    return {
      orgAccountUnique: uniqueIndex('org_user_unique').on(
        table.organisationId,
        table.username,
      ),
    };
  },
);
