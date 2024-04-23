import { pgTable, text, index, foreignKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';
import { domain } from './domain';
import { project } from './project';
import { file } from './file';
import { document } from './document';
import { embeddedResource } from './embed-resource';

export const documentation = pgTable(
    'documentation',
    {
        documentationId: text('documentation_id').primaryKey().notNull(),
        domainId: text('domain_id')
            .notNull()
            .references(() => domain.domainId),
        name: text('name').notNull(),
        type: text('type').notNull(),
        parentId: text('parent_id'),
        projectId: text('project_id').references(() => project.projectId),
        fileId: text('file_id').references(() => file.fileId),
        documentId: text('document_id').references(() => document.documentId),
        embeddedResourceId: text('embedded_resource_id').references(() => embeddedResource.embeddedResourceId),
    },
    (table) => {
        return {
            domainIdIdx: index('documentation_domainId_idx').on(table.domainId),
            projectIdIdx: index('project_project_id_idx').on(table.projectId),
            documentationParentIdFkey: foreignKey({
                columns: [table.parentId],
                foreignColumns: [table.documentationId],
                name: 'documentation_parent_id_fkey',
            })
                .onDelete('set null')
                .onUpdate('cascade'),
        };
    },
);

export const documentationRelations = relations(documentation, ({ one, many }) => ({
    project: one(project, {
        fields: [documentation.projectId],
        references: [project.projectId],
    }),
    file: one(file, {
        fields: [documentation.fileId],
        references: [file.fileId],
    }),
    document: one(document, {
        fields: [documentation.documentId],
        references: [document.documentId],
    }),
    embeddedResource: one(embeddedResource, {
        fields: [documentation.embeddedResourceId],
        references: [embeddedResource.embeddedResourceId],
    }),
    parent: one(documentation, {
        fields: [documentation.parentId],
        references: [documentation.documentationId],
        relationName: 'child_documentation',
    }),
    children: many(documentation, { relationName: 'child_documentation' }),
}));
