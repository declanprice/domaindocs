import { pgTable, index, text, uniqueIndex } from 'drizzle-orm/pg-core'
import { person } from './person'
import { subdomain } from './subdomain'
import { project } from './project'
import { relations } from 'drizzle-orm/relations'

export const resourceLink = pgTable(
  'resource_link',
  {
    linkId: text('link_id').primaryKey().notNull(),
    subdomainId: text('subdomain_id')
      .references(() => subdomain.subdomainId, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    projectId: text('project_id')
      .references(() => project.projectId, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    title: text('title').notNull(),
    subTitle: text('sub_title').default('Goto Resource').notNull(),
    href: text('href').notNull(),
    iconUri: text('icon_uri').default(
      'https://cdn1.vectorstock.com/i/1000x1000/25/25/resources-allocation-icon-on-white-vector-27442525.jpg',
    ),
  },
  (table) => {
    return {
      subdomainIndex: index('resource_link_subdomain_index').on(
        table.subdomainId,
      ),
      projectIndex: index('resource_link_project_index').on(
        table.projectId,
      ),
    };
  },
);

export const resourceLinkRelations = relations(
  resourceLink,
  ({ one }) => ({
    subdomain: one(subdomain, {
      fields: [resourceLink.subdomainId],
      references: [subdomain.subdomainId],
    }),
    project: one(project, {
      fields: [resourceLink.projectId],
      references: [project.projectId],
    }),
  }),
);
