import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '@domaindocs/database';

export const DATABASE = 'DB';

export type DatabaseSchema = PostgresJsDatabase<typeof schema>;
