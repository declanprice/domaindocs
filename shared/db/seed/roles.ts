import { ros } from './domain';
import { Role } from '@prisma/client';

export const softwareDevRole = (): Role => {
    return {
        roleId: 'softwaredev',
        domainId: ros().domainId,
        name: 'Software Developer',
        description: 'Developing user interfaces for the browser.',
    };
};

export const teamLeadRole = (): Role => {
    return {
        roleId: 'teamleader',
        domainId: ros().domainId,
        name: 'Team Leader',
        description: 'Developing user interfaces for the browser.',
    };
};
