import { ros } from './domain';
import { project } from '../src';

export const deedSearch = (): typeof project.$inferInsert => {
    return {
        projectId: 'deedsearch',
        domainId: ros().domainId,
        name: 'Deed Search',
        iconUri: null,
        description: '',
    };
};

export const lrArchive = () => {
    return {
        projectId: 'lrarchive',
        domainId: ros().domainId,
        name: 'LR Archive',
        iconUri: null,
        description: '',
    };
};
