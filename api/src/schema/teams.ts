import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core'

import { domains, domainUserProfiles } from './domains'

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
    domainUserProfileId: uuid('domain_user_profile_id')
        .notNull()
        .references(() => domainUserProfiles.id),
    domainId: uuid('domain_id')
        .notNull()
        .references(() => domains.id)
})
