import { ros } from './domain';
import { Skill } from '@prisma/client';

export const uiDevSkill = (): Skill => {
    return {
        skillId: 'uidev',
        domainId: ros().domainId,
        name: 'UI Development',
    };
};

export const apiDevSkill = (): Skill => {
    return {
        skillId: 'apidev',
        domainId: ros().domainId,
        name: 'API Development',
    };
};

export const devOpsSkill = (): Skill => {
    return {
        skillId: 'devops',
        domainId: ros().domainId,
        name: 'Dev Ops',
    };
};
