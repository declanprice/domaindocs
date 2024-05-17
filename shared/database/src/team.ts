import { pgTable, uniqueIndex, text, index, primaryKey, foreignKey } from 'drizzle-orm/pg-core';
import { domain, documentationFile, person, projectOwnership } from './index';
import { relations } from 'drizzle-orm/relations';

export const team = pgTable(
    'team',
    {
        teamId: text('team_id').primaryKey().notNull(),
        domainId: text('domain_id')
            .notNull()
            .references(() => domain.domainId, {
                onDelete: 'restrict',
                onUpdate: 'cascade',
            }),
        name: text('name').notNull(),
        iconUri: text('icon_uri').default('https://cdn-icons-png.flaticon.com/512/1369/1369288.png'),
    },
    (table) => {
        return {
            domainIdIdx: index('team_domain_id_idx').on(table.domainId),
        };
    },
);

export const teamMember = pgTable(
    'team_member',
    {
        teamId: text('team_id')
            .notNull()
            .references(() => team.teamId, {
                onDelete: 'restrict',
                onUpdate: 'cascade',
            }),
        userId: text('user_id').notNull(),
        domainId: text('domain_id')
            .notNull()
            .references(() => domain.domainId, {
                onDelete: 'restrict',
                onUpdate: 'cascade',
            }),
    },
    (table) => {
        return {
            teamMemberPkey: primaryKey({
                columns: [table.teamId, table.userId],
                name: 'team_member_pkey',
            }),
            teamMemberPersonFkey: foreignKey({
                columns: [table.userId, table.domainId],
                foreignColumns: [person.userId, person.domainId],
                name: 'team_member_person_fkey',
            })
                .onUpdate('cascade')
                .onDelete('restrict'),
            userIdIdx: index('team_member_userId_key').on(table.userId),
            teamIdIdx: index('team_member_teamId_idx').on(table.teamId),
            domainIdIdx: index('team_member_domain_id_idx').on(table.domainId),
        };
    },
);

export const teamRelations = relations(team, ({ one, many }) => ({
    members: many(teamMember),
    ownership: many(projectOwnership),
    files: many(documentationFile),
}));

export const teamMemberRelations = relations(teamMember, ({ one, many }) => ({
    team: one(team, {
        fields: [teamMember.teamId],
        references: [team.teamId],
    }),
    person: one(person, {
        fields: [teamMember.userId, teamMember.domainId],
        references: [person.userId, person.domainId],
    }),
}));
