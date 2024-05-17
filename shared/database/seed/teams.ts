import { ros } from './domain';
import * as schema from '../src';
import { benUser, declanUser, natashaUser } from './users';

export const teamOrion = (): typeof schema.team.$inferInsert => {
    return {
        teamId: 'orion',
        domainId: ros().domainId,
        iconUri: null,
        name: 'Team Orion',
    };
};

export const teamKeplar = (): typeof schema.team.$inferInsert => {
    return {
        teamId: 'keplar',
        domainId: ros().domainId,
        iconUri: null,
        name: 'Team Keplar',
    };
};

export const teamMembers = (): (typeof schema.teamMember.$inferInsert)[] => {
    return [
        {
            teamId: teamOrion().teamId,
            userId: declanUser().userId,
            domainId: ros().domainId,
        },
        {
            teamId: teamOrion().teamId,
            userId: benUser().userId,
            domainId: ros().domainId,
        },
        {
            teamId: teamOrion().teamId,
            userId: natashaUser().userId,
            domainId: ros().domainId,
        },
        {
            teamId: teamKeplar().teamId,
            userId: declanUser().userId,
            domainId: ros().domainId,
        },
        {
            teamId: teamKeplar().teamId,
            userId: natashaUser().userId,
            domainId: ros().domainId,
        },
    ];
};
