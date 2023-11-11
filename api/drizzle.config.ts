import type { Config } from 'drizzle-kit'

export default {
    driver: 'pg',
    schema: './src/schema',
    out: './drizzle',
    dbCredentials: {
        connectionString: 'postgres://postgres:postgres@localhost:5432'
    }
} satisfies Config
