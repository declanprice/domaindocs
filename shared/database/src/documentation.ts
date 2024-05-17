import { pgTable, text, index, foreignKey, timestamp, customType, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';
import { domain } from './domain';
import { project } from './project';
import { person } from './person';
import { team } from './team';

export const documentation = pgTable(
    'documentation',
    {
        documentationId: text('documentation_id').primaryKey().notNull(),
        domainId: text('domain_id')
            .notNull()
            .references(() => domain.domainId),
        projectId: text('project_id').references(() => project.projectId, {
            onDelete: 'restrict',
            onUpdate: 'cascade',
        }),
        teamId: text('team_id').references(() => team.teamId, {
            onDelete: 'restrict',
            onUpdate: 'cascade',
        }),
        name: text('name'),
        createdAt: timestamp('created_at').notNull().defaultNow(),
        updatedAt: timestamp('updated_at').notNull().defaultNow(),
        type: text('type').notNull(),
        parentId: text('parent_id'),
        createdByUserId: text('created_by_user_id').notNull(),
    },
    (table) => {
        return {
            domainIdIdx: index('documentation_domainId_idx').on(table.domainId),
            parentFk: foreignKey({
                columns: [table.parentId],
                foreignColumns: [table.documentationId],
                name: 'documentation_parent_id_fkey',
            })
                .onUpdate('cascade')
                .onDelete('restrict'),
            personFkey: foreignKey({
                columns: [table.createdByUserId, table.domainId],
                foreignColumns: [person.userId, person.domainId],
                name: 'documentation_person_fkey',
            })
                .onUpdate('cascade')
                .onDelete('restrict'),
        };
    },
);

const bytea = customType<{ data: Buffer; notNull: false; default: false }>({
    dataType() {
        return 'bytea';
    },
});

export const documentationDocument = pgTable('documentation_document', {
    documentationDocumentId: text('documentation_document_id').primaryKey(),
    domainId: text('domain_id')
        .notNull()
        .references(() => domain.domainId, {
            onDelete: 'restrict',
            onUpdate: 'cascade',
        }),
    documentationId: text('documentation_id').references(() => documentation.documentationId, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
    }),
    data: bytea('data'),
});

export const documentationFile = pgTable(
    'file',
    {
        documentationFileId: text('documentation_file_id').primaryKey(),
        domainId: text('domain_id')
            .notNull()
            .references(() => domain.domainId, {
                onDelete: 'restrict',
                onUpdate: 'cascade',
            }),
        documentationId: text('documentation_id').references(() => documentation.documentationId, {
            onDelete: 'restrict',
            onUpdate: 'cascade',
        }),
        key: text('key'),
        name: text('name'),
        type: text('type'),
        isUploaded: boolean('is_uploaded').notNull().default(false),
    },
    (table) => ({
        domainIndex: index('file_domain_index').on(table.domainId),
    }),
);

export const documentationRelations = relations(documentation, ({ one, many }) => ({
    domain: one(domain, {
        fields: [documentation.domainId],
        references: [domain.domainId],
    }),
    project: one(project, {
        fields: [documentation.projectId],
        references: [project.projectId],
    }),
    team: one(team, {
        fields: [documentation.teamId],
        references: [team.teamId],
    }),
    file: one(documentationFile, {
        fields: [documentation.documentationId],
        references: [documentationFile.documentationId],
    }),
    document: one(documentationDocument, {
        fields: [documentation.documentationId],
        references: [documentationDocument.documentationId],
    }),
    createdBy: one(person, {
        fields: [documentation.createdByUserId],
        references: [person.userId],
    }),
    parent: one(documentation, {
        fields: [documentation.parentId],
        references: [documentation.documentationId],
        relationName: 'child_documentation',
    }),
    children: many(documentation, { relationName: 'child_documentation' }),
}));

export const documentationDocumentRelations = relations(documentationDocument, ({ one }) => ({
    domain: one(domain, {
        fields: [documentationDocument.domainId],
        references: [domain.domainId],
    }),
    documentation: one(documentation, {
        fields: [documentationDocument.documentationId],
        references: [documentation.documentationId],
    }),
}));

export const documentationFileRelations = relations(documentationFile, ({ one }) => ({
    domain: one(domain, {
        fields: [documentationFile.domainId],
        references: [domain.domainId],
    }),
    documentation: one(documentation, {
        fields: [documentationFile.documentationId],
        references: [documentation.documentationId],
    }),
}));
