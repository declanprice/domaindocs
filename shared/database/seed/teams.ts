import { ros } from './domain';
import { team } from '../src';

export const teamOrion = (): typeof team.$inferInsert => {
    return {
        teamId: 'orion',
        domainId: ros().domainId,
        iconUri: null,
        name: 'Team Orion',
    };
};

export const teamKeplar = (): typeof team.$inferInsert => {
    return {
        teamId: 'keplar',
        domainId: ros().domainId,
        iconUri: null,
        name: 'Team Keplar',
    };
};
