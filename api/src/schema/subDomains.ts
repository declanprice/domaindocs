import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core'

import { domains } from './domains'

import { teams } from './teams'
import { documentation } from './documentation'

export const subDomains = pgTable('sub_domains', {
    id: uuid('id').notNull().defaultRandom().primaryKey(),
    domainId: uuid('domain_d')
        .notNull()
        .references(() => domains.id),
    documentationId: uuid('documentation_id')
        .notNull()
        .references(() => documentation.id),
    name: varchar('name').notNull()
})

export const subDomainTeams = pgTable('sub_domain_teams', {
    domainId: uuid('domain_id')
        .notNull()
        .references(() => domains.id),
    subDomainId: uuid('sub_domain_id')
        .notNull()
        .references(() => subDomains.id),
    teamId: uuid('team_id')
        .notNull()
        .references(() => teams.id)
})
