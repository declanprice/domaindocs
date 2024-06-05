import { benUser, declanUser, natashaUser } from './users';
import { ros } from './domain';
import { softwareDevRole, teamLeadRole } from './roles';
import { apiDevSkill, devOpsSkill, uiDevSkill } from './skills';

import { Person, PersonContact, PersonRole, PersonSkill } from '@prisma/client';
import { PersonContactType } from '../../types/src';
import { v4 } from 'uuid';

export const declanPerson = (): Person => {
    return {
        userId: declanUser().userId,
        domainId: ros().domainId,
        dateJoined: new Date(),
        aboutMe: 'I am a software developer',
    };
};

export const benPerson = (): Person => {
    return {
        userId: benUser().userId,
        domainId: ros().domainId,
        dateJoined: new Date(),
        aboutMe: 'I am a software developer',
    };
};

export const natashaPerson = (): Person => {
    return {
        userId: natashaUser().userId,
        domainId: ros().domainId,
        dateJoined: new Date(),
        aboutMe: 'I am a software developer',
    };
};

export const personContacts = (): PersonContact[] => {
    return [
        {
            contactId: v4(),
            userId: declanUser().userId,
            domainId: ros().domainId,
            type: PersonContactType.EMAIL,
            description: 'declanprice1@gmail.com',
            href: null,
        },
        {
            contactId: v4(),
            userId: benUser().userId,
            domainId: ros().domainId,
            type: PersonContactType.MOBILE,
            description: '0732564895',
            href: null,
        },
        {
            contactId: v4(),
            userId: natashaUser().userId,
            domainId: ros().domainId,
            type: PersonContactType.LINK,
            href: 'https://google.com',
            description: 'Google',
        },
    ];
};

export const personRoles = (): PersonRole[] => {
    return [
        {
            userId: declanUser().userId,
            domainId: ros().domainId,
            roleId: softwareDevRole().roleId,
            isPrimary: false,
        },
        {
            userId: declanUser().userId,
            domainId: ros().domainId,
            roleId: teamLeadRole().roleId,
            isPrimary: true,
        },
        {
            userId: benUser().userId,
            domainId: ros().domainId,
            roleId: softwareDevRole().roleId,
            isPrimary: true,
        },
        {
            userId: natashaUser().userId,
            domainId: ros().domainId,
            roleId: softwareDevRole().roleId,
            isPrimary: true,
        },
    ];
};

export const personSkills = (): PersonSkill[] => {
    return [
        {
            userId: declanUser().userId,
            domainId: ros().domainId,
            skillId: apiDevSkill().skillId,
        },
        {
            userId: declanUser().userId,
            domainId: ros().domainId,
            skillId: uiDevSkill().skillId,
        },
        {
            userId: declanUser().userId,
            domainId: ros().domainId,
            skillId: devOpsSkill().skillId,
        },
        {
            userId: benUser().userId,
            domainId: ros().domainId,
            skillId: devOpsSkill().skillId,
        },
        {
            userId: natashaUser().userId,
            domainId: ros().domainId,
            skillId: uiDevSkill().skillId,
        },
    ];
};
