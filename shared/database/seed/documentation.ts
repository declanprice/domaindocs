import { DocumentationType } from '../../types/src';
import { declanPerson } from './people';
import { ros } from './domain';
import { teamOrion } from './teams';

import { Documentation, DocumentationDocument, DocumentationFile } from '@prisma/client';
import { deedSearchComponent } from './components';

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
            componentId: null,
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
            componentId: null,
        },
        {
            domainId: ros().domainId,
            componentId: deedSearchComponent().componentId,
            documentationId: deedSearchComponent().componentId,
            name: null,
            type: DocumentationType.COMPONENT_ROOT_FOLDER,
            createdAt: new Date(),
            updatedAt: new Date(),
            createdByUserId: declanPerson().userId,
            parentId: null,
            teamId: null,
        },
        {
            domainId: ros().domainId,
            documentationId: `${deedSearchComponent().componentId}-file1`,
            name: 'File 1',
            type: DocumentationType.FILE,
            createdAt: new Date(),
            updatedAt: new Date(),
            createdByUserId: declanPerson().userId,
            parentId: deedSearchComponent().componentId,
            componentId: null,
            teamId: null,
        },
        {
            domainId: ros().domainId,
            documentationId: `${deedSearchComponent().componentId}-file2`,
            name: 'File 2',
            type: DocumentationType.FILE,
            createdAt: new Date(),
            updatedAt: new Date(),
            createdByUserId: declanPerson().userId,
            parentId: deedSearchComponent().componentId,
            componentId: null,
            teamId: null,
        },
        {
            domainId: ros().domainId,
            documentationId: `${deedSearchComponent().componentId}-folder1`,
            name: 'Folder 1',
            type: DocumentationType.FOLDER,
            createdAt: new Date(),
            updatedAt: new Date(),
            createdByUserId: declanPerson().userId,
            parentId: deedSearchComponent().componentId,
            componentId: null,
            teamId: null,
        },
        {
            domainId: ros().domainId,
            documentationId: `${deedSearchComponent().componentId}-doc1`,
            name: 'Architecture Plan',
            type: DocumentationType.FILE,
            createdAt: new Date(),
            updatedAt: new Date(),
            createdByUserId: declanPerson().userId,
            parentId: `${deedSearchComponent().componentId}-folder1`,
            componentId: null,
            teamId: null,
        },
    ];
};

export const documentationFiles = (): DocumentationFile[] => [
    {
        documentationId: `${deedSearchComponent().componentId}-file1`,
        fileId: 'file1',
        domainId: ros().domainId,
    },
    {
        documentationId: `${deedSearchComponent().componentId}-file2`,
        fileId: 'file2',
        domainId: ros().domainId,
    },
];

export const documentationDocuments = (): DocumentationDocument[] => {
    return [
        {
            documentationId: `${deedSearchComponent().componentId}-doc1`,
            domainId: ros().domainId,
            data: null,
        },
    ];
};
