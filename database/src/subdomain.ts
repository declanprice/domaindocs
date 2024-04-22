import {
  pgTable,
  uniqueIndex,
  text,
  index,
  foreignKey,
  primaryKey,
} from 'drizzle-orm/pg-core';
import { domain, person, team } from './index';
import { relations } from 'drizzle-orm/relations';

export const subdomain = pgTable(
  'subdomain',
  {
    subdomainId: text('subdomain_id').primaryKey().notNull(),
    domainId: text('domain_id')
      .notNull()
      .references(() => domain.domainId, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    name: text('name').notNull(),
    description: text('description').default('').notNull(),
  },
  (table) => {
    return {
      nameKey: uniqueIndex('subdomain_name_key').on(table.name),
      domainIdIdx: index('subdomain_domain_id_idx').on(table.domainId),
    };
  },
);

export const subdomainContact = pgTable(
  'subdomain_contact',
  {
    contactId: text('contact_id').primaryKey().notNull(),
    subdomainId: text('subdomain_id')
      .notNull()
      .references(() => subdomain.subdomainId, {
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
      personIdIdx: index('subdomain_contact_person_id_idx').on(table.personId),
      subdomainIdIdx: index('subdomain_contact_subdomain_id_idx').on(
        table.subdomainId,
      ),
      personIdSubdomainIdKey: uniqueIndex(
        'subdomain_contact_person_id_subdomain_id_key',
      ).on(table.subdomainId, table.personId),
    };
  },
);

export const subdomainResourceLink = pgTable(
  'subdomain_resource_link',
  {
    linkId: text('link_id').primaryKey().notNull(),
    subdomainId: text('subdomain_id')
      .notNull()
      .references(() => subdomain.subdomainId, {
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
      subdomainIdIdx: index('subdomain_resource_link_subdomain_id_idx').on(
        table.subdomainId,
      ),
    };
  },
);

export const subdomainRelations = relations(subdomain, ({ one, many }) => ({
  domain: one(domain, {
    fields: [subdomain.domainId],
    references: [domain.domainId],
  }),
  contacts: many(subdomainContact),
  resourceLinks: many(subdomainResourceLink),
  teams: many(team),
}));

export const subdomainContactRelations = relations(
  subdomainContact,
  ({ one }) => ({
    subdomain: one(subdomain, {
      fields: [subdomainContact.subdomainId],
      references: [subdomain.subdomainId],
    }),
    person: one(person, {
      fields: [subdomainContact.personId],
      references: [person.personId],
    }),
  }),
);

export const subdomainResourceLinkRelations = relations(
  subdomainResourceLink,
  ({ one }) => ({
    subdomain: one(subdomain, {
      fields: [subdomainResourceLink.subdomainId],
      references: [subdomain.subdomainId],
    }),
  }),
);
