import { ros } from './domain';
import * as schema from '../src';
import { v4 } from 'uuid';
import { teamKeplar, teamOrion } from './teams';

export const deedSearchProject = (): typeof schema.project.$inferInsert => {
    return {
        projectId: 'deedsearch',
        domainId: ros().domainId,
        name: 'Deed Search',
        iconUri: null,
        description: '',
    };
};

export const projectLinks = (): (typeof schema.projectLink.$inferInsert)[] => {
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

export const projectOwnership = (): (typeof schema.projectOwnership.$inferInsert)[] => {
    return [
        {
            ownershipId: v4(),
            domainId: ros().domainId,
            projectId: deedSearchProject().projectId,
            teamId: teamOrion().teamId,
            description: 'API Development',
        },
        {
            ownershipId: v4(),
            domainId: ros().domainId,
            projectId: deedSearchProject().projectId,
            teamId: teamKeplar().teamId,
            description: 'UI Development',
        },
    ];
};
