import { File } from '@prisma/client';
import { ros } from './domain';
import { deedSearchProject } from './projects';

export const files = (): File[] => {
    return [
        {
            domainId: ros().domainId,
            fileId: 'file1',
            key: `${ros().domainId}/${deedSearchProject().projectId}/file1.jpg`,
            type: 'jpg',
            name: 'file1.jpg',
            isUploaded: true,
            bucket: 'domaindocs-dev-private',
            createdDate: new Date(),
        },
        {
            domainId: ros().domainId,
            fileId: 'file2',
            key: `${ros().domainId}/${deedSearchProject().projectId}/file1.jpg`,
            type: 'jpg',
            name: 'file2.jpg',
            isUploaded: true,
            bucket: 'domaindocs-dev-private',
            createdDate: new Date(),
        },
        {
            domainId: ros().domainId,
            fileId: 'file3',
            key: `${ros().domainId}/${deedSearchProject().projectId}/file3.jpg`,
            type: 'jpg',
            name: 'file3.jpg',
            isUploaded: true,
            bucket: 'domaindocs-dev-private',
            createdDate: new Date(),
        },
    ];
};
