import { benUser, declanUser, natashaUser } from './users';
import { ros } from './domain';
import { person } from '../src';

export const declanPerson = (): typeof person.$inferInsert => {
    return {
        personId: 'declan',
        userId: declanUser().userId,
        domainId: ros().domainId,
        role: 'Software Developer',
        contactEmail: 'work-areas@gmail.com',
        contactMobile: '07304624123',
        personalContactMobile: '07304624123',
        personalContactEmail: 'personal@gmail.com',
    };
};

export const benPerson = (): typeof person.$inferInsert => {
    return {
        personId: 'ben',
        userId: benUser().userId,
        domainId: ros().domainId,
        role: 'Project Manager',
        contactEmail: 'work-areas@gmail.com',
        contactMobile: '07304624123',
        personalContactMobile: '07304624123',
        personalContactEmail: 'personal@gmail.com',
    };
};

export const natashaPerson = (): typeof person.$inferInsert => {
    return {
        personId: 'natasha',
        userId: natashaUser().userId,
        domainId: ros().domainId,
        role: 'UX Designer',
        contactEmail: 'work-areas@gmail.com',
        contactMobile: '07304624123',
        personalContactMobile: '07304624123',
        personalContactEmail: 'personal@gmail.com',
    };
};
