import { drizzle } from 'drizzle-orm/postgres-js'

import postgres from 'postgres'

export const db = drizzle(
    postgres('postgres://postgres:postgres@localhost:5432')
)
