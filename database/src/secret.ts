import { index, pgTable, text } from 'drizzle-orm/pg-core';
import { domain } from './domain';
import { project } from './project';
import { relations } from 'drizzle-orm/relations'

export const secret = pgTable(
    'secret',
    {
        secretId: text('secret_id').primaryKey(),
        name: text('name').notNull(),
        uri: text('uri').notNull(),
        domainId: text('domain_id')
            .notNull()
            .references(() => domain.domainId),
        projectId: text('project_id')
          .notNull()
          .references(() => project.projectId),
    },
    (table) => ({
        domainIndex: index('secret_domain_index').on(table.domainId),
        projectIndex: index('secret_project_index').on(table.projectId),
    }),
);

export const secretRelations = relations(secret, ({one}) => ({
  project: one(project, {
    fields: [secret.projectId],
    references: [project.projectId]
  })
}))
