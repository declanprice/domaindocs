import { integer, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

import { accounts } from './accounts'

export const documentation = pgTable('documentation', {
    id: uuid('id').notNull().defaultRandom().primaryKey()
})

export const documentationFolders = pgTable('documentation_folders', {
    id: uuid('id').notNull().defaultRandom().primaryKey(),
    documentationId: uuid('documentation_id')
        .notNull()
        .references(() => documentation.id),
    position: integer('position').notNull(),
    depth: integer('depth').notNull(),
    name: varchar('name').notNull()
})

export type DocumentationPageType = 'file' | 'text_editor'

export const documentationPages = pgTable('documentation_pages', {
    id: uuid('id').notNull().defaultRandom().primaryKey(),
    documentationId: uuid('documentation_id')
        .notNull()
        .references(() => documentation.id),
    documentationFolderId: uuid('documentation_folder_id')
        .notNull()
        .references(() => documentationFolders.id),
    name: varchar('name').notNull(),
    type: varchar('type').notNull().$type<DocumentationPageType>(),
    createdByUser: uuid('created_by_user')
        .notNull()
        .references(() => accounts.id),
    timestamp: timestamp('timestamp', { withTimezone: true })
        .notNull()
        .defaultNow(),
    source: varchar('source').notNull(),
    position: integer('position').notNull()
})
