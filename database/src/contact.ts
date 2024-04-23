import { pgTable, index, text, uniqueIndex } from 'drizzle-orm/pg-core'
import { person } from './person'
import { subdomain } from './subdomain'
import { project } from './project'
import { relations } from 'drizzle-orm/relations'

export const contact = pgTable(
  'contact',
  {
    contactId: text('contact_id').primaryKey().notNull(),
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
    personId: text('person_id')
      .notNull()
      .references(() => person.personId, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
  },
  (table) => {
    return {
      personIndex: index('contact_person_index').on(table.personId),
      subdomainIndex: index('contact_subdomain_index').on(
        table.subdomainId,
      ),
      projectIndex: index('contact_project_index').on(
        table.projectId,
      ),
      personSubdomainUnique: uniqueIndex(
        'contact_person_subdomain_unique',
      ).on(table.subdomainId, table.personId),
      personProjectUnique: uniqueIndex(
        'contact_person_project_unique',
      ).on(table.projectId, table.personId),
    };
  },
);

export const contactRelations = relations(
  contact,
  ({ one }) => ({
    subdomain: one(subdomain, {
      fields: [contact.subdomainId],
      references: [subdomain.subdomainId],
      relationName: 'subdomain_contacts'
    }),
    project: one(project, {
      fields: [contact.projectId],
      references: [project.projectId],
      relationName: 'project_contacts'
    }),
    person: one(person, {
      fields: [contact.personId],
      references: [person.personId],
    }),
  }),
);
