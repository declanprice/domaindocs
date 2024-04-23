import { boolean, index, pgTable, text } from 'drizzle-orm/pg-core';
import { domain } from './domain';
import { project } from './project';
import { relations } from 'drizzle-orm/relations';

export const file = pgTable(
    'file',
    {
        fileId: text('file_id').primaryKey(),
        uri: text('uri').notNull(),
        name: text('name').notNull(),
        type: text('type').notNull(),
        isUploaded: boolean('is_uploaded').notNull().default(false),
        domainId: text('domain_id')
            .notNull()
            .references(() => domain.domainId),
        projectId: text('project_id')
            .notNull()
            .references(() => project.projectId),
    },
    (table) => ({
        domainIndex: index('file_domain_index').on(table.domainId),
        projectIndex: index('file_project_index').on(table.projectId),
    }),
);

export const fileRelations = relations(file, ({ one }) => ({
    project: one(project, {
        fields: [file.projectId],
        references: [project.projectId],
    }),
}));
