import {pgTable, uuid} from "drizzle-orm/pg-core";
import {drizzle} from "drizzle-orm/postgres-js";
import postgres from "postgres";

export const users = pgTable('users', {
    id: uuid('id').notNull().defaultRandom().primaryKey()
});

export const domains = pgTable('domains', {
    id: uuid('id').notNull().defaultRandom().primaryKey()
});

export const subDomains = pgTable('sub_domains', {
    id: uuid('id').notNull().defaultRandom().primaryKey()
});

export const db = drizzle(postgres('postgres://postgres:postgres@localhost:5432'));