import { benUser, declanUser, natashaUser } from './users';
import { ros } from './domain';
import * as schema from '../src';
import { softwareDevRole, teamLeadRole } from './roles';
import { apiDevSkill, devOpsSkill, uiDevSkill } from './skills';

export const declanPerson = (): typeof schema.person.$inferInsert => {
    return {
        userId: declanUser().userId,
        domainId: ros().domainId,
    };
};

export const benPerson = (): typeof schema.person.$inferInsert => {
    return {
        userId: benUser().userId,
        domainId: ros().domainId,
    };
};

export const natashaPerson = (): typeof schema.person.$inferInsert => {
    return {
        userId: natashaUser().userId,
        domainId: ros().domainId,
    };
};

export const personContactDetails = (): (typeof schema.personContactDetails.$inferInsert)[] => {
    return [
        {
            userId: declanUser().userId,
            domainId: ros().domainId,
            workEmail: 'work-areas@gmail.com',
            workMobile: '07304624123',
            personalMobile: '07304624123',
            personalEmail: 'personal@gmail.com',
        },
        {
            userId: benUser().userId,
            domainId: ros().domainId,
            workEmail: 'work-areas@gmail.com',
            workMobile: '07304624123',
            personalMobile: '07304624123',
            personalEmail: 'personal@gmail.com',
        },
        {
            userId: natashaUser().userId,
            domainId: ros().domainId,
            workEmail: 'work-areas@gmail.com',
            workMobile: '07304624123',
            personalMobile: '07304624123',
            personalEmail: 'personal@gmail.com',
        },
    ];
};

export const personRoles = (): (typeof schema.personRole.$inferInsert)[] => {
    return [
        {
            userId: declanUser().userId,
            domainId: ros().domainId,
            roleId: softwareDevRole().roleId,
        },
        {
            userId: declanUser().userId,
            domainId: ros().domainId,
            roleId: teamLeadRole().roleId,
        },
        {
            userId: benUser().userId,
            domainId: ros().domainId,
            roleId: softwareDevRole().roleId,
        },
        {
            userId: natashaUser().userId,
            domainId: ros().domainId,
            roleId: softwareDevRole().roleId,
        },
    ];
};

export const personSkills = (): (typeof schema.personSkill.$inferInsert)[] => {
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
