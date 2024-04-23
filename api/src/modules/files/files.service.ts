import { Inject, Injectable } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import { eq } from 'drizzle-orm';
import { file } from '@domaindocs/database';
import { File, FileProject, SearchFiles } from '@domaindocs/lib';
import { DATABASE, DatabaseSchema } from '../../tokens/database.token';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ConfigService } from '@nestjs/config';
import { SignedFileUrl } from '../../../../lib/src/file/signed-file-url';

@Injectable()
export class FilesService {
    private s3 = new S3Client({});
    private PRIVATE_BUCKET_NAME: string;

    constructor(
        private config: ConfigService,
        @Inject(DATABASE) private db: DatabaseSchema,
    ) {
        this.PRIVATE_BUCKET_NAME = this.config.get('PRIVATE_BUCKET_NAME');
    }

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
                    new FileProject(file.projectId, file.project.name, file.project.team.subdomain.name),
                ),
        );
    }

    async getSignedUrl(session: UserSession, domainId: string, fileId: string) {
        const result = await this.db.query.file.findFirst({
            where: eq(file.fileId, fileId),
        });

        const getObject = new GetObjectCommand({
            Bucket: this.PRIVATE_BUCKET_NAME,
            Key: result.key,
        });

        const signedUrl = await getSignedUrl(this.s3, getObject, { expiresIn: 3600 });

        return new SignedFileUrl(signedUrl);
    }
}
