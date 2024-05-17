import { DocumentationType } from '../../lib/src';
import { declanPerson } from './people';

export const documentation = (domainId: string, rootId: string, isDomainRoot?: boolean) => {
    return [
        {
            domainId,
            projectId: rootId,
            documentationId: rootId,
            name: isDomainRoot ? 'Domain Root' : 'Project Root',
            type: isDomainRoot ? DocumentationType.DOMAIN_ROOT_FOLDER : DocumentationType.PROJECT_ROOT_FOLDER,
            createdAt: new Date(),
            updatedAt: new Date(),
            createdBy: declanPerson().personId,
            parentId: null,
        },
        {
            domainId,
            documentationId: `${rootId}-1`,
            fileId: `${domainId}-${rootId}-file1`,
            name: 'Logo',
            parentId: rootId,
            type: DocumentationType.FILE,
            createdAt: new Date(),
            updatedAt: new Date(),
            createdBy: declanPerson().personId,
        },
        {
            domainId,
            documentationId: `${rootId}-2`,
            fileId: `${domainId}-${rootId}-file2`,
            name: 'Project Plan',
            parentId: rootId,
            documentId: '1',
            type: DocumentationType.FILE,
            createdAt: new Date(),
            updatedAt: new Date(),
            createdBy: declanPerson().personId,
        },
        {
            domainId,
            documentationId: `${rootId}-4`,
            name: 'Site Maps',
            parentId: rootId,
            type: DocumentationType.FOLDER,
            createdAt: new Date(),
            updatedAt: new Date(),
            createdBy: declanPerson().personId,
        },
        {
            domainId,
            documentationId: `${rootId}-5`,
            fileId: `${domainId}-${rootId}-file3`,
            parentId: `${rootId}-4`,
            name: 'Site Map Item',
            type: DocumentationType.FILE,
            createdAt: new Date(),
            updatedAt: new Date(),
            createdBy: declanPerson().personId,
        },
    ];
};
