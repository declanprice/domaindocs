import { Subdomain } from '@prisma/client';
import { ros } from './domain';

export const mobileBanking = (): Subdomain => {
    return {
        domainId: ros().domainId,
        subdomainId: 'mobilebanking',
        name: 'Mobile Banking',
        description: '',
        dateCreated: new Date(),
    };
};

export const customerExperience = (): Subdomain => {
    return {
        domainId: ros().domainId,
        subdomainId: 'customerexperience',
        name: 'Customer Experience',
        description: '',
        dateCreated: new Date(),
    };
};
