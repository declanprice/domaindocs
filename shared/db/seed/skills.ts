import { ros } from './domain';
import { Skill } from '@prisma/client';

export const uiDevSkill = (): Skill => {
    return {
        skillId: 'uidev',
        domainId: ros().domainId,
        name: 'UI Development',
        description: 'Developing user interfaces for the browser.',
    };
};

export const apiDevSkill = (): Skill => {
    return {
        skillId: 'apidev',
        domainId: ros().domainId,
        name: 'API Development',
        description: 'Developing backend api services.',
    };
};

export const devOpsSkill = (): Skill => {
    return {
        skillId: 'devops',
        domainId: ros().domainId,
        name: 'Dev Ops',
        description: 'Development operations.',
    };
};
