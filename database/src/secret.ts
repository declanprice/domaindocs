import { index, pgTable, text } from 'drizzle-orm/pg-core'
import { domain } from './domain'
import { subdomain } from './subdomain'
import { project } from './project'

export const secret = pgTable('secret', {
  secretId: text('secret_id').primaryKey(),
  name: text('name').notNull(),
  uri: text('uri').notNull(),
  domainId: text('domain_id').notNull().references(() => domain.domainId),
  subdomainId: text('subdomain_id').references(() => subdomain.subdomainId),
  projectId: text('project_id').references(() => project.projectId),
}, (table) => ({
  domainIndex: index('secret_domain_index').on(table.domainId),
  subdomainIndex: index('secret_subdomain_index').on(table.subdomainId),
  projectIndex: index('secret_project_index').on(table.projectId)
}));
