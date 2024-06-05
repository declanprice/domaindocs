import { BadRequestException, Injectable } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import {
    AddDocumentationData,
    DetailedDocumentation,
    Documentation,
    DocumentationType,
    SearchDocumentationParams,
} from '@domaindocs/types';
import { v4 } from 'uuid';
import { S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../shared/prisma.service';

@Injectable()
export class DocumentationService {
    private s3 = new S3Client({});
    private PRIVATE_BUCKET_NAME: string;

    constructor(
        private config: ConfigService,
        private prisma: PrismaService,
    ) {
        this.PRIVATE_BUCKET_NAME = this.config.get('PRIVATE_BUCKET_NAME');
    }

    async search(session: UserSession, domainId: string, params: SearchDocumentationParams) {
        let where: any = {
            OR: [
                {
                    type: DocumentationType.DOMAIN_ROOT_FOLDER,
                },
                {
                    type: DocumentationType.COMPONENT_ROOT_FOLDER,
                },
                {
                    type: DocumentationType.TEAM_ROOT_FOLDER,
                },
            ],
        };

        if (params.domainId) {
            where = {
                domainId,
                type: DocumentationType.DOMAIN_ROOT_FOLDER,
            };
        }

        if (params.componentId) {
            where = {
                componentId: params.componentId,
                type: DocumentationType.COMPONENT_ROOT_FOLDER,
            };
        }

        if (params.teamId) {
            where = {
                teamId: params.teamId,
                type: DocumentationType.TEAM_ROOT_FOLDER,
            };
        }

        const result = await this.prisma.documentation.findMany({
            where,
            include: {
                domain: true,
                component: true,
                team: true,
                children: {
                    include: {
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

            if (d.component) {
                rootName = d.component.name;
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
        const result = await this.prisma.documentation.findFirst({
            where: {
                documentationId,
            },
            include: {
                createdByUser: true,
            },
        });

        return new DetailedDocumentation(
            result.documentationId,
            result.name,
            result.type as DocumentationType,
            result.createdAt.toISOString(),
            result.updatedAt.toISOString(),
            result.createdByUser,
        );
    }

    async add(session: UserSession, domainId: string, parentDocumentationId: string, data: AddDocumentationData) {
        const parent = await this.prisma.documentation.findFirst({
            where: {
                documentationId: parentDocumentationId,
            },
        });

        if (parent?.type === DocumentationType.FOLDER && data.type === DocumentationType.FOLDER) {
            throw new BadRequestException('Cannot create nested folders.');
        }

        await this.prisma.$transaction(async (tx) => {
            const documentationId = v4();

            await tx.documentation.create({
                data: {
                    documentationId: documentationId,
                    domainId,
                    name: `New ${data.type}`,
                    parentId: parentDocumentationId,
                    type: data.type,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    createdByUserId: session.userId,
                },
            });

            if (data.type === DocumentationType.FILE) {
                await tx.documentationFile.create({
                    data: {
                        domainId,
                        documentationId,
                    },
                });
            }

            if (data.type === DocumentationType.DOCUMENT) {
                await tx.documentationDocument.create({
                    data: {
                        domainId,
                        documentationId,
                    },
                });
            }
        });
    }

    async remove(session: UserSession, domainId: string, documentationId: string) {
        await this.prisma.documentation.delete({
            where: {
                documentationId,
            },
        });
    }
}
