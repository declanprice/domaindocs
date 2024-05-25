import { DocumentationType } from '../../types/src';
import { declanPerson } from './people';
import { ros } from './domain';
import { deedSearchProject } from './projects';
import { teamOrion } from './teams';

import { Documentation, DocumentationDocument, DocumentationFile } from '@prisma/client';

export const documentation = (): Documentation[] => {
    return [
        {
            domainId: ros().domainId,
            documentationId: ros().domainId,
            name: null,
            type: DocumentationType.DOMAIN_ROOT_FOLDER,
            createdAt: new Date(),
            updatedAt: new Date(),
            createdByUserId: declanPerson().userId,
            parentId: null,
            projectId: null,
            teamId: null,
        },
        {
            domainId: ros().domainId,
            teamId: teamOrion().teamId,
            documentationId: teamOrion().teamId,
            name: null,
            type: DocumentationType.TEAM_ROOT_FOLDER,
            createdAt: new Date(),
            updatedAt: new Date(),
            createdByUserId: declanPerson().userId,
            parentId: null,
            projectId: null,
        },
        {
            domainId: ros().domainId,
            projectId: deedSearchProject().projectId,
            documentationId: deedSearchProject().projectId,
            name: null,
            type: DocumentationType.PROJECT_ROOT_FOLDER,
            createdAt: new Date(),
            updatedAt: new Date(),
            createdByUserId: declanPerson().userId,
            parentId: null,
            teamId: null,
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
            projectId: null,
            teamId: null,
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
            projectId: null,
            teamId: null,
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
            projectId: null,
            teamId: null,
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
            projectId: null,
            teamId: null,
        },
    ];
};

export const documentationFiles = (): DocumentationFile[] => [
    {
        documentationId: `${deedSearchProject().projectId}-file1`,
        key: `${ros().domainId}/${deedSearchProject().projectId}/file1.jpg`,
        type: 'jpg',
        name: 'file1.jpg',
        domainId: ros().domainId,
        isUploaded: false,
    },
    {
        documentationId: `${deedSearchProject().projectId}-file2`,
        key: `${ros().domainId}/${deedSearchProject().projectId}/file2.jpg`,
        type: 'jpg',
        name: 'file2.jpg',
        domainId: ros().domainId,
        isUploaded: false,
    },
];

export const documentationDocuments = (): DocumentationDocument[] => {
    return [
        {
            documentationId: `${deedSearchProject().projectId}-doc1`,
            domainId: ros().domainId,
            data: null,
        },
    ];
};
