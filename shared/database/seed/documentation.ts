import { DocumentationType } from '../../lib/src';
import { declanPerson } from './people';
import { documentationFile } from '../src';
import * as schema from '../src';
import { ros } from './domain';
import { deedSearchProject } from './projects';
import { teamOrion } from './teams';

export const documentation = (): (typeof schema.documentation.$inferInsert)[] => {
    return [
        {
            domainId: ros().domainId,
            documentationId: ros().domainId,
            type: DocumentationType.DOMAIN_ROOT_FOLDER,
            createdAt: new Date(),
            updatedAt: new Date(),
            createdByUserId: declanPerson().userId,
            parentId: null,
        },
        {
            domainId: ros().domainId,
            teamId: teamOrion().teamId,
            documentationId: teamOrion().teamId,
            type: DocumentationType.TEAM_ROOT_FOLDER,
            createdAt: new Date(),
            updatedAt: new Date(),
            createdByUserId: declanPerson().userId,
            parentId: null,
        },
        {
            domainId: ros().domainId,
            projectId: deedSearchProject().projectId,
            documentationId: deedSearchProject().projectId,
            type: DocumentationType.PROJECT_ROOT_FOLDER,
            createdAt: new Date(),
            updatedAt: new Date(),
            createdByUserId: declanPerson().userId,
            parentId: null,
        },
        {
            domainId: ros().domainId,
            documentationId: `${deedSearchProject().projectId}-file1`,
            name: 'File 1',
            type: DocumentationType.FILE,
            createdAt: new Date(),
            updatedAt: new Date(),
            createdByUserId: declanPerson().userId,
            parentId: deedSearchProject().projectId,
        },
        {
            domainId: ros().domainId,
            documentationId: `${deedSearchProject().projectId}-file2`,
            name: 'File 2',
            type: DocumentationType.FILE,
            createdAt: new Date(),
            updatedAt: new Date(),
            createdByUserId: declanPerson().userId,
            parentId: deedSearchProject().projectId,
        },
        {
            domainId: ros().domainId,
            documentationId: `${deedSearchProject().projectId}-folder1`,
            name: 'Folder 1',
            type: DocumentationType.FOLDER,
            createdAt: new Date(),
            updatedAt: new Date(),
            createdByUserId: declanPerson().userId,
            parentId: deedSearchProject().projectId,
        },
        {
            domainId: ros().domainId,
            documentationId: `${deedSearchProject().projectId}-doc1`,
            name: 'Architecture Plan',
            type: DocumentationType.FILE,
            createdAt: new Date(),
            updatedAt: new Date(),
            createdByUserId: declanPerson().userId,
            parentId: `${deedSearchProject().projectId}-folder1`,
        },
    ];
};

export const documentationFiles = (): (typeof documentationFile.$inferInsert)[] => [
    {
        documentationId: `${deedSearchProject().projectId}-file1`,
        key: `${ros().domainId}/${deedSearchProject().projectId}/file1.jpg`,
        type: 'jpg',
        name: 'file1.jpg',
        domainId: ros().domainId,
    },
    {
        documentationId: `${deedSearchProject().projectId}-file2`,
        key: `${ros().domainId}/${deedSearchProject().projectId}/file2.jpg`,
        type: 'jpg',
        name: 'file2.jpg',
        domainId: ros().domainId,
    },
];

export const documentationDocuments = (): (typeof schema.documentationDocument.$inferInsert)[] => {
    return [
        {
            documentationId: `${deedSearchProject().projectId}-doc1`,
            domainId: ros().domainId,
            data: undefined,
        },
    ];
};
