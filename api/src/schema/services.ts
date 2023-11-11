import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core'
import { subDomains } from './subDomains'
import { teams } from './teams'
import { documentation } from './documentation'

export const services = pgTable('services', {
    id: uuid('id').notNull().defaultRandom().primaryKey(),
    subDomainId: uuid('sub_domain_id')
        .notNull()
        .references(() => subDomains.id),
    documentationId: uuid('documentation_id')
        .notNull()
        .references(() => documentation.id),
    name: varchar('name').notNull(),
    summary: varchar('summary'),
    sourceCodeLink: varchar('source_code_link')
})

export const serviceDependencies = pgTable('service_dependencies', {
    id: uuid('id').notNull().defaultRandom().primaryKey(),
    serviceId: uuid('service_id')
        .notNull()
        .references(() => services.id),
    dependencyType: varchar('dependency_type')
        .notNull()
        .$type<'uses' | 'usedBy'>()
})

export const serviceTechnologies = pgTable('service_technologies', {
    id: uuid('id').notNull().defaultRandom().primaryKey(),
    serviceId: uuid('service_id')
        .notNull()
        .references(() => services.id),
    name: uuid('name').notNull()
})

export const serviceTeams = pgTable('service_teams', {
    serviceId: uuid('service_id')
        .notNull()
        .references(() => services.id),
    teamId: uuid('team_id')
        .notNull()
        .references(() => teams.id)
})
