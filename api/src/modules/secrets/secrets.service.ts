import { Inject, Injectable } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '@domaindocs/database';

@Injectable()
export class SecretsService {
  constructor(@Inject('DB') private db: PostgresJsDatabase<typeof schema>) {}

  async searchSecrets(session: UserSession, domainId: string) {
  }
}
