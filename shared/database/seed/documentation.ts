import { DocumentationType } from '../../lib/src';
import { declanPerson } from './people';
import { documentationFile } from '../src';
import * as schema from '../src';
import { ros } from './domain';
import { deedSearchProject } from './projects';

export const documentation = (): (typeof schema.documentation.$inferInsert)[] => {
    return [
        {
            domainId: ros().domainId,
            projectId: deedSearchProject().projectId,
            documentationId: `${deedSearchProject().projectId}-root`,
            name: 'Project Root',
            type: DocumentationType.PROJECT_ROOT_FOLDER,
            createdAt: new Date(),
            updatedAt: new Date(),
            createdByUserId: declanPerson().userId,
            parentId: null,
        },
        {
            domainId: ros().domainId,
            projectId: deedSearchProject().projectId,
            documentationId: `${deedSearchProject().projectId}-file1`,
            documentationFileId: `${deedSearchProject().projectId}-file1`,
            name: 'File 1',
            parentId: `${deedSearchProject().projectId}-root`,
            type: DocumentationType.FILE,
            createdAt: new Date(),
            updatedAt: new Date(),
            createdByUserId: declanPerson().userId,
        },
        {
            domainId: ros().domainId,
            documentationId: `${deedSearchProject().projectId}-file2`,
            documentationFileId: `${deedSearchProject().projectId}-file2`,
            name: 'File 2',
            parentId: `${deedSearchProject().projectId}-root`,
            type: DocumentationType.FILE,
            createdAt: new Date(),
            updatedAt: new Date(),
            createdByUserId: declanPerson().userId,
        },
        {
            domainId: ros().domainId,
            documentationId: `${deedSearchProject().projectId}-folder1`,
            name: 'Folder 1',
            parentId: `${deedSearchProject().projectId}-root`,
            type: DocumentationType.FOLDER,
            createdAt: new Date(),
            updatedAt: new Date(),
            createdByUserId: declanPerson().userId,
        },
        {
            domainId: ros().domainId,
            documentationId: `${deedSearchProject().projectId}-doc1`,
            documentationDocumentId: `${deedSearchProject().projectId}-doc1`,
            name: 'Architecture Plan',
            type: DocumentationType.FILE,
            createdAt: new Date(),
            updatedAt: new Date(),
            createdByUserId: declanPerson().userId,
        },
    ];
};

export const documentationFiles = (): (typeof documentationFile.$inferInsert)[] => [
    {
        documentationFileId: `${deedSearchProject().projectId}-file1`,
        key: `${ros().domainId}/${deedSearchProject().projectId}/file1.jpg`,
        type: 'jpg',
        name: 'file1.jpg',
        domainId: ros().domainId,
        projectId: deedSearchProject().projectId,
    },
    {
        documentationFileId: `${deedSearchProject().projectId}-file2`,
        key: `${ros().domainId}/${deedSearchProject().projectId}/file2.jpg`,
        type: 'jpg',
        name: 'file2.jpg',
        domainId: ros().domainId,
        projectId: deedSearchProject().projectId,
    },
    {
        documentationFileId: `${deedSearchProject().projectId}-file3`,
        key: `${ros().domainId}/${deedSearchProject().projectId}/file3.jpg`,
        type: 'jpg',
        name: 'file3.jpg',
        domainId: ros().domainId,
        projectId: deedSearchProject().projectId,
    },
];

export const documentationDocuments = (): (typeof schema.documentationDocument.$inferInsert)[] => {
    return [
        {
            documentationDocumentId: `${deedSearchProject().projectId}-doc1`,
            domainId: ros().domainId,
            data: undefined,
        },
    ];
};
