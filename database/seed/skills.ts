import { ros } from './domain';

export const uiDevSkill = () => {
  return {
    skillId: 'uidev',
    domainId: ros().domainId,
    name: 'UI Development',
    description: 'Developing user interfaces for the browser.',
  };
};

export const apiDevSkill = () => {
  return {
    skillId: 'apidev',
    domainId: ros().domainId,
    name: 'API Development',
    description: 'Developing backend api services.',
  };
};

export const devOpsSkill = () => {
  return {
    skillId: 'devops',
    domainId: ros().domainId,
    name: 'Dev Ops',
    description: 'Development operations.',
  };
};
