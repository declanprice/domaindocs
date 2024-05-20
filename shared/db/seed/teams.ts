import { ros } from './domain';
import { benUser, declanUser, natashaUser } from './users';
import { Team, TeamMember } from '@prisma/client';

export const teamOrion = (): Team => {
    return {
        teamId: 'orion',
        domainId: ros().domainId,
        iconUri: null,
        name: 'Team Orion',
    };
};

export const teamKeplar = (): Team => {
    return {
        teamId: 'keplar',
        domainId: ros().domainId,
        iconUri: null,
        name: 'Team Keplar',
    };
};

export const teamMembers = (): TeamMember[] => {
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
