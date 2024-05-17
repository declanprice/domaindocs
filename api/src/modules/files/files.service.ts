import { Inject, Injectable } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import { and, eq, isNull } from 'drizzle-orm';
import { domain, documentationFile, team } from '@domaindocs/database';
import { DetailedFile, File, FileProject, FileTeam, SearchFilesParams } from '@domaindocs/lib';
import { DATABASE, DatabaseSchema } from '../../tokens/database.token';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ConfigService } from '@nestjs/config';
import { SignedFileUrl } from '@domaindocs/lib';

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

    async searchFiles(session: UserSession, domainId: string, params: SearchFilesParams): Promise<DetailedFile[]> {
        let where = eq(documentationFile.domainId, domainId);

        if (params.domainId) {
            where = and(eq(domain, params.domainId), isNull(documentationFile.projectId), isNull(team.teamId));
        }

        if (params.projectId) {
            where = eq(documentationFile.projectId, params.projectId);
        }

        if (params.teamId) {
            where = eq(documentationFile.teamId, params.teamId);
        }

        const result = await this.db.query.documentationFile.findMany({
            where,
            with: {
                project: true,
                team: true,
            },
        });

        return result.map(
            (file) =>
                new DetailedFile(
                    new File(file.fileId, file.name, file.type),
                    file.project ? new FileProject(file.projectId, file.project.name) : undefined,
                    file.team ? new FileTeam(file.teamId, file.team.name, file.team.iconUri) : undefined,
                ),
        );
    }

    async getSignedUrl(session: UserSession, domainId: string, fileId: string) {
        const result = await this.db.query.documentationFile.findFirst({
            where: eq(documentationFile.fileId, fileId),
        });

        const getObject = new GetObjectCommand({
            Bucket: this.PRIVATE_BUCKET_NAME,
            Key: result.key,
        });

        const signedUrl = await getSignedUrl(this.s3, getObject, { expiresIn: 3600 });

        return new SignedFileUrl(signedUrl);
    }
}
