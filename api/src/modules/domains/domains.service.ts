import { Inject, Injectable } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import { createSlug } from '../../util/create-slug';
import { v4 } from 'uuid';
import { SetupDomainData } from '@domaindocs/lib';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '@domaindocs/database';
import { domain, person } from '@domaindocs/database';

@Injectable()
export class DomainsService {
    constructor(@Inject('DB') private db: PostgresJsDatabase<typeof schema>) {}

    async setupDomain(session: UserSession, dto: SetupDomainData) {
        const personId = v4();

        await this.db.transaction(async (tx) => {
            const domainId = createSlug(dto.domainName);

            await tx.insert(domain).values({
                domainId,
                name: dto.domainName,
            });

            await tx.insert(person).values({
                domainId,
                personId,
                userId: session.userId,
            });
        });
    }
}
