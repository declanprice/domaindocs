import { ros } from './domain';
import { benUser, declanUser, natashaUser } from './users';
import { Team, TeamContact, TeamLink, TeamMember } from '@prisma/client';
import { v4 } from 'uuid';
import { ContactType } from '../../types/src';

export const teamOrion = (): Team => {
    return {
        teamId: 'orion',
        domainId: ros().domainId,
        iconUri: null,
        name: 'Team Orion',
        dateFormed: new Date(),
        description:
            'Team orion is responsible for the development and maintenance of Deed Search, LR Archive, DocMan & more.',
    };
};

export const teamKeplar = (): Team => {
    return {
        teamId: 'keplar',
        domainId: ros().domainId,
        iconUri: null,
        dateFormed: new Date(),
        name: 'Team Keplar',
        description: '',
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

export const teamContacts = (): TeamContact[] => {
    return [
        {
            contactId: v4(),
            teamId: teamOrion().teamId,
            domainId: ros().domainId,
            type: ContactType.EMAIL,
            reason: '',
            description: 'declanprice1@gmail.com',
            href: null,
        },
        {
            contactId: v4(),
            teamId: teamOrion().teamId,
            domainId: ros().domainId,
            type: ContactType.MOBILE,
            reason: '',
            description: '0732564895',
            href: null,
        },
        {
            contactId: v4(),
            teamId: teamOrion().teamId,
            domainId: ros().domainId,
            type: ContactType.LINK,
            href: 'https://google.com',
            reason: '',
            description: 'Google',
        },
    ];
};

export const teamLinks = (): TeamLink[] => {
    return [
        {
            linkId: v4(),
            teamId: teamOrion().teamId,
            domainId: ros().domainId,
            href: 'https://google.com',
            description: 'Google',
        },
    ];
};
