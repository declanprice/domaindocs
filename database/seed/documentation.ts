import { DocumentationType } from '../../lib/src';

export const documentation = (domainId: string, projectId: string) => {
    return [
        {
            domainId,
            projectId: projectId,
            documentationId: projectId,
            name: 'Project Root',
            type: DocumentationType.PROJECT,
            parentId: null,
        },
        {
            domainId,
            documentationId: `${projectId}-1`,
            fileId: `${domainId}-${projectId}-file1`,
            name: 'Logo',
            parentId: projectId,
            type: DocumentationType.FILE,
        },
        {
            domainId,
            documentationId: `${projectId}-2`,
            fileId: `${domainId}-${projectId}-file2`,
            name: 'Project Plan',
            parentId: projectId,
            type: DocumentationType.FILE,
        },
        {
            domainId,
            documentationId: `${projectId}-4`,
            name: 'Site Maps',
            parentId: projectId,
            type: DocumentationType.FOLDER,
        },
        {
            domainId,
            documentationId: `${projectId}-5`,
            fileId: `${domainId}-${projectId}-file3`,
            parentId: `${projectId}-4`,
            name: 'Site Map Item',
            type: DocumentationType.FILE,
        },
    ];
};
