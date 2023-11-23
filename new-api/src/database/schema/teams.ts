import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core'
import { organisations } from './organisations'
import { people } from './people'

export const teams = pgTable('teams', {
    id: uuid('id').notNull().defaultRandom().primaryKey(),
    name: varchar('name').notNull(),
    organisationId: uuid('organisation_id')
        .notNull()
        .references(() => organisations.id)
})

export const teamMembers = pgTable('team_members', {
    teamId: uuid('team_id')
        .notNull()
        .references(() => teams.id),
    personId: uuid('personId')
        .notNull()
        .references(() => people.id)
})
