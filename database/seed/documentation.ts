import { DocumentationType } from '../../lib/src';

export const documentation = (domainId: string, rootId: string) => {
    return [
        {
            domainId,
            projectId: rootId,
            documentationId: rootId,
            name: 'Project Root',
            type: DocumentationType.PROJECT,
            parentId: null,
        },
        {
            domainId,
            documentationId: `${rootId}-1`,
            name: 'Logo',
            parentId: rootId,
            type: DocumentationType.FILE,
        },
        {
            domainId,
            documentationId: `${rootId}-2`,
            name: 'Project Plan',
            parentId: rootId,
            type: DocumentationType.FILE,
        },
        {
            domainId,
            documentationId: `${rootId}-4`,
            name: 'Site Maps',
            parentId: rootId,
            type: DocumentationType.FOLDER,
        },
        {
            domainId,
            documentationId: `${rootId}-5`,
            parentId: `${rootId}-4`,
            name: 'Site Map Item',
            type: DocumentationType.FILE,
        },
    ];
};
