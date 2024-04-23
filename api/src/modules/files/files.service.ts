import { Inject, Injectable } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import { eq } from 'drizzle-orm';
import { file } from '@domaindocs/database';
import { File, FileProject, SearchFiles } from '@domaindocs/lib';
import { DATABASE, DatabaseSchema } from '../../tokens/database.token';

@Injectable()
export class FilesService {
    constructor(@Inject(DATABASE) private db: DatabaseSchema) {}

    async searchFiles(session: UserSession, domainId: string, dto: SearchFiles): Promise<File[]> {
        let where = eq(file.domainId, domainId);

        if (dto.projectId) {
            where = eq(file.projectId, dto.projectId);
        }

        const result = await this.db.query.file.findMany({
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
            (file) =>
                new File(
                    file.fileId,
                    file.name,
                    file.type,
                    file.uri,
                    new FileProject(file.projectId, file.project.name, file.project.team.subdomain.name),
                ),
        );
    }
}
