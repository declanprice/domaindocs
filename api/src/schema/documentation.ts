import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { users } from './users'

export const documentation = pgTable('documentation', {
    id: uuid('id').notNull().defaultRandom().primaryKey()
})

export const documentationFolders = pgTable('documentation_folders', {
    id: uuid('id').notNull().defaultRandom().primaryKey(),
    documentationId: uuid('documentation_id')
        .notNull()
        .references(() => documentation.id),
    name: varchar('name').notNull()
})

export type DocumentationItemType =
    | 'file'
    | 'text_editor'
    | 'white_board_editor'
    | 'miro_board'
    | 'api_spec_openapi'
    | 'api_spec_asyncapi'

export const documentationItem = pgTable('documentation_item', {
    id: uuid('id').notNull().defaultRandom().primaryKey(),
    documentationId: uuid('documentation_id')
        .notNull()
        .references(() => documentation.id),
    documentationFolderId: uuid('documentation_folder_id')
        .notNull()
        .references(() => documentation.id),
    name: varchar('name').notNull(),
    type: varchar('type').notNull().$type<DocumentationItemType>(),
    uploadedByUser: uuid('uploaded_by_user')
        .notNull()
        .references(() => users.id),
    timestamp: timestamp('timestamp', { withTimezone: true })
        .notNull()
        .defaultNow(),
    source: varchar('source').notNull()
})
