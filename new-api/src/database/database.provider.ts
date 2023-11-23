import { FactoryProvider, Logger, Inject } from '@nestjs/common';
import { DefaultLogger, LogWriter } from 'drizzle-orm';
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as postgres from 'postgres';
import * as schema from './schema';

export const DATABASE = Symbol('DATABASE');

export const InjectDatabase = () => Inject(DATABASE);

export type Database = PostgresJsDatabase<typeof schema>;

export const DatabaseProvider: FactoryProvider = {
  provide: DATABASE,
  useFactory: () => {
    const logger = new Logger('Database');

    class DatabaseLogger implements LogWriter {
      write(message: string) {
        logger.verbose(message);
      }
    }

    logger.debug('Connected to postgres!');

    return drizzle(postgres('postgres://postgres:postgres@localhost:5432'), {
      logger: new DefaultLogger({ writer: new DatabaseLogger() }),
      schema,
    });
  },
};
