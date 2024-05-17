import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import {
    AddDocumentationData,
    DetailedDocumentation,
    Documentation,
    DocumentationType,
    SearchDocumentationParams,
    SignedFileUrl,
} from '@domaindocs/lib';
import { v4 } from 'uuid';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '@domaindocs/database';
import { documentation, documentationDocument, documentationFile } from '@domaindocs/database';
import { and, eq, or } from 'drizzle-orm';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DocumentationService {
    private s3 = new S3Client({});
    private PRIVATE_BUCKET_NAME: string;

    constructor(
        private config: ConfigService,
        @Inject('DB') private db: PostgresJsDatabase<typeof schema>,
    ) {
        this.PRIVATE_BUCKET_NAME = this.config.get('PRIVATE_BUCKET_NAME');
    }

    async search(session: UserSession, domainId: string, params: SearchDocumentationParams) {
        let where = or(
            eq(documentation.type, DocumentationType.DOMAIN_ROOT_FOLDER),
            eq(documentation.type, DocumentationType.PROJECT_ROOT_FOLDER),
            eq(documentation.type, DocumentationType.TEAM_ROOT_FOLDER),
        );

        if (params.domainId) {
            where = and(
                eq(documentation.domainId, domainId),
                eq(documentation.type, DocumentationType.DOMAIN_ROOT_FOLDER),
            );
        }

        if (params.projectId) {
            where = and(
                eq(documentation.projectId, params.projectId),
                eq(documentation.type, DocumentationType.PROJECT_ROOT_FOLDER),
            );
        }

        if (params.teamId) {
            where = and(
                eq(documentation.teamId, params.teamId),
                eq(documentation.type, DocumentationType.TEAM_ROOT_FOLDER),
            );
        }

        const result = await this.db.query.documentation.findMany({
            where,
            with: {
                domain: true,
                project: true,
                team: true,
                children: {
                    with: {
                        children: true,
                    },
                },
            },
        });

        return result.map((d) => {
            let rootName = d.name;

            if (d.domain) {
                rootName = d.domain.name;
            }

            if (d.project) {
                rootName = d.project.name;
            }

            if (d.team) {
                rootName = d.team.name;
            }

            return new Documentation(
                d.documentationId,
                rootName,
                d.type as DocumentationType,
                d.children.map(
                    (d1) =>
                        new Documentation(
                            d1.documentationId,
                            d1.name,
                            d1.type as DocumentationType,
                            d1.children.map(
                                (d2) =>
                                    new Documentation(d2.documentationId, d2.name, d2.type as DocumentationType, null),
                            ),
                        ),
                ),
            );
        });
    }

    async get(session: UserSession, domainId: string, documentationId: string): Promise<DetailedDocumentation> {
        const result = await this.db.query.documentation.findFirst({
            where: eq(documentation.documentationId, documentationId),
            with: {
                createdBy: {
                    with: {
                        user: true,
                    },
                },
            },
        });

        return new DetailedDocumentation(
            result.documentationId,
            result.name,
            result.type as DocumentationType,
            result.createdAt.toISOString(),
            result.updatedAt.toISOString(),
            result.createdBy.user,
        );
    }

    async add(session: UserSession, domainId: string, parentDocumentationId: string, data: AddDocumentationData) {
        const parent = await this.db.query.documentation.findFirst({
            where: eq(documentation.documentationId, parentDocumentationId),
        });

        if (parent?.type === DocumentationType.FOLDER && data.type === DocumentationType.FOLDER) {
            throw new BadRequestException('Cannot create nested folders.');
        }

        await this.db.transaction(async (tx) => {
            const documentationId = v4();

            await tx.insert(documentation).values({
                documentationId: documentationId,
                domainId,
                name: `New ${data.type}`,
                parentId: parentDocumentationId,
                type: data.type,
                createdAt: new Date(),
                updatedAt: new Date(),
                createdByUserId: session.userId,
            });

            if (data.type === DocumentationType.FILE) {
                await tx.insert(documentationFile).values({
                    domainId,
                    documentationId,
                });
            }

            if (data.type === DocumentationType.DOCUMENT) {
                await tx.insert(documentationDocument).values({
                    domainId,
                    documentationId,
                });
            }
        });
    }

    async remove(session: UserSession, domainId: string, documentationId: string) {
        await this.db.delete(documentation).where(eq(documentation.documentationId, documentationId));
    }

    async getDocumentationFileSignedUrl(session: UserSession, domainId: string, documentationId: string) {
        const result = await this.db.query.documentationFile.findFirst({
            where: eq(documentationFile.documentationId, documentationId),
        });

        const getObject = new GetObjectCommand({
            Bucket: this.PRIVATE_BUCKET_NAME,
            Key: result.key,
        });

        const signedUrl = await getSignedUrl(this.s3, getObject, { expiresIn: 3600 });

        return new SignedFileUrl(signedUrl);
    }
}
