import { ros } from './domain';
import { role } from '../src';

export const softwareDevRole = (): typeof role.$inferInsert => {
    return {
        roleId: 'softwaredev',
        domainId: ros().domainId,
        name: 'Software Developer',
        description: 'Developing user interfaces for the browser.',
    };
};

export const teamLeadRole = () => {
    return {
        roleId: 'teamleader',
        domainId: ros().domainId,
        name: 'Team Leader',
        description: 'Developing user interfaces for the browser.',
    };
};
