import {
  pgTable,
  uniqueIndex,
  text,
  index,
  foreignKey,
  primaryKey,
} from 'drizzle-orm/pg-core';
import { documentation, domain, person } from './index';
import { relations } from 'drizzle-orm/relations';

export const user = pgTable(
  'user',
  {
    userId: text('user_id').primaryKey().notNull(),
    email: text('email').notNull(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    fullName: text('full_name').notNull(),
    iconUri: text('icon_uri').default(
      'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745',
    ),
  },
  (table) => {
    return {
      emailKey: uniqueIndex('user_email_key').on(table.email),
    };
  },
);

export const usersRelations = relations(user, ({ many }) => ({
  people: many(person),
}));
