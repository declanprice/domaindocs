import { boolean, index, pgTable, text } from 'drizzle-orm/pg-core'
import { domain } from './domain'
import { subdomain } from './subdomain'
import { project } from './project'

export const file = pgTable('file', {
  fileId: text('file_id').primaryKey(),
  uri: text('uri').notNull(),
  name: text('name').notNull(),
  type: text('type').notNull(),
  isUploaded: boolean('is_uploaded').notNull().default(false),
  domainId: text('domain_id').notNull().references(() => domain.domainId),
  subdomainId: text('subdomain_id').references(() => subdomain.subdomainId),
  projectId: text('project_id').references(() => project.projectId),
}, (table) => ({
  domainIndex: index('file_domain_index').on(table.domainId),
  subdomainIndex: index('file_subdomain_index').on(table.subdomainId),
  projectIndex: index('file_project_index').on(table.projectId)
}));
