import { Inject, Injectable } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import { SearchSecrets, Secret, SecretProject } from '@domaindocs/lib';
import { eq } from 'drizzle-orm';
import { file, secret } from '@domaindocs/database';
import { DATABASE, DatabaseSchema } from '../../tokens/database.token';

@Injectable()
export class SecretsService {
    constructor(@Inject(DATABASE) private db: DatabaseSchema) {}

    async searchSecrets(session: UserSession, domainId: string, dto: SearchSecrets): Promise<Secret[]> {
        let where = eq(secret.domainId, domainId);

        if (dto.projectId) {
            where = eq(secret.projectId, dto.projectId);
        }

        const result = await this.db.query.secret.findMany({
            where,
            with: {
                project: {
                    with: {
                        team: {
                            with: {
                                subdomain: true,
                            },
                        },
                    },
                },
            },
        });

        return result.map(
            (secret) =>
                new Secret(
                    secret.secretId,
                    secret.name,
                    secret.uri,
                    new SecretProject(secret.projectId, secret.project.name, secret.project.team.subdomain.name),
                ),
        );
    }
}
