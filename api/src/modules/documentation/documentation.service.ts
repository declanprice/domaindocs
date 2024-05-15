import { Inject, Injectable } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import {
    Documentation,
    DocumentationType,
    DocumentDocumentation,
    FileDocumentation,
    SearchDocumentationParams,
    ViewDocumentation,
} from '@domaindocs/lib';
import { AddDocumentationData } from '@domaindocs/lib';
import { v4 } from 'uuid';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '@domaindocs/database';
import { documentation } from '@domaindocs/database';
import { and, eq, isNotNull } from 'drizzle-orm';

@Injectable()
export class DocumentationService {
    constructor(@Inject('DB') private db: PostgresJsDatabase<typeof schema>) {}

    async search(session: UserSession, domainId: string, dto: SearchDocumentationParams) {
        let where = isNotNull(documentation.projectId);

        if (dto.projectId) {
            where = eq(documentation.documentationId, dto.projectId);
        }

        if (dto.domainWiki) {
            where = and(
                eq(documentation.domainId, domainId),
                eq(documentation.type, DocumentationType.DOMAIN_ROOT_FOLDER),
            );
        }

        const result = await this.db.query.documentation.findMany({
            where,
            with: {
                project: true,
                children: {
                    with: {
                        children: true,
                    },
                },
            },
        });

        return result.map(
            (d) =>
                new Documentation(
                    d.documentationId,
                    d.project.name,
                    d.type as DocumentationType,
                    d.children.map(
                        (d1) =>
                            new Documentation(
                                d1.documentationId,
                                d1.name,
                                d1.type as DocumentationType,
                                d1.children.map(
                                    (d2) =>
                                        new Documentation(
                                            d2.documentationId,
                                            d2.name,
                                            d2.type as DocumentationType,
                                            null,
                                        ),
                                ),
                            ),
                    ),
                ),
        );
    }

    async get(session: UserSession, domainId: string, documentationId: string): Promise<ViewDocumentation> {
        const result = await this.db.query.documentation.findFirst({
            where: eq(documentation.documentationId, documentationId),
            with: {
                file: true,
                document: true,
            },
        });

        if (result.file) {
            return new FileDocumentation(result.documentationId, result.name, DocumentationType.FILE, {
                fileId: result.file.fileId,
                fileName: result.file.name,
            });
        }

        if (result.document) {
            return new DocumentDocumentation(result.documentationId, result.name, DocumentationType.DOCUMENT, {
                documentId: result.document.documentId,
                documentName: result.document.title,
            });
        }

        throw new Error(`unsupported documentation type of ${result.type}`);
    }

    async add(session: UserSession, domainId: string, documentationId: string, dto: AddDocumentationData) {
        await this.db.insert(documentation).values({
            documentationId: v4(),
            domainId,
            name: `New ${dto.type}`,
            parentId: documentationId,
            type: dto.type,
        });
    }

    async remove(session: UserSession, domainId: string, documentationId: string) {
        await this.db.delete(documentation).where(eq(documentation.documentationId, documentationId));
    }
}
