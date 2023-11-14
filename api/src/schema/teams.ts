import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core'

import { domains, domainUsers } from './domains'

export const teams = pgTable('teams', {
    id: uuid('id').notNull().defaultRandom().primaryKey(),
    name: varchar('name').notNull(),
    domainId: uuid('domain_id')
        .notNull()
        .references(() => domains.id)
})

export const teamMembers = pgTable('team_members', {
    teamId: uuid('team_id')
        .notNull()
        .references(() => teams.id),
    domainUserId: uuid('domain_user_d')
        .notNull()
        .references(() => domainUsers.id),
    domainId: uuid('domain_id')
        .notNull()
        .references(() => domains.id)
})
