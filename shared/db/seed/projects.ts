import { ros } from './domain';
import { v4 } from 'uuid';
import { teamKeplar, teamOrion } from './teams';
import { Project, ProjectLink, ProjectOwnership } from '@prisma/client';

export const deedSearchProject = (): Project => {
    return {
        projectId: 'deedsearch',
        domainId: ros().domainId,
        name: 'Deed Search',
        description: '',
    };
};

export const projectLinks = (): ProjectLink[] => {
    return [
        {
            linkId: v4(),
            domainId: ros().domainId,
            projectId: deedSearchProject().projectId,
            title: 'Grafana',
            subTitle: 'Go to dashboard',
            href: 'https://github.com/grafana',
            iconUri: '',
        },
        {
            linkId: v4(),
            domainId: ros().domainId,
            projectId: deedSearchProject().projectId,
            title: 'Github',
            subTitle: 'Go to code',
            href: 'https://github.com/grafana',
            iconUri: '',
        },
    ];
};

export const projectOwnership = (): ProjectOwnership[] => {
    return [
        {
            ownershipId: v4(),
            domainId: ros().domainId,
            projectId: deedSearchProject().projectId,
            teamId: teamOrion().teamId,
            userId: null,
            description: 'API Development',
        },
        {
            ownershipId: v4(),
            domainId: ros().domainId,
            projectId: deedSearchProject().projectId,
            teamId: teamKeplar().teamId,
            userId: null,
            description: 'UI Development',
        },
    ];
};
