import { file } from '../src';

export const files = (domainId: string, projectId: string): (typeof file.$inferInsert)[] => [
    {
        fileId: `${domainId}-${projectId}-file1`,
        key: `${domainId}/${projectId}/file1.jpg`,
        type: 'jpg',
        name: 'file1.jpg',
        domainId,
        projectId,
    },
    {
        fileId: `${domainId}-${projectId}-file2`,
        key: `${domainId}/${projectId}/file2.jpg`,
        type: 'jpg',
        name: 'file2.jpg',
        domainId,
        projectId,
    },
    {
        fileId: `${domainId}-${projectId}-file3`,
        key: `${domainId}/${projectId}/file3.jpg`,
        type: 'jpg',
        name: 'file3.jpg',
        domainId,
        projectId,
    },
];
