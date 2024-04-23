import { Inject, Injectable } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '@domaindocs/database';
import { eq } from 'drizzle-orm'
import { file } from '@domaindocs/database'

@Injectable()
export class FilesService {
  constructor(@Inject('DB') private db: PostgresJsDatabase<typeof schema>) {}

  async searchFiles(session: UserSession, domainId: string) {

    const result = await this.db.query.file.findMany({
      where: eq(file.domainId, domainId)
    });



  }
}
