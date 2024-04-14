import { Skill } from '@prisma/client';
import { ros } from './domain';

export const nodeJsSkill = (): Skill => {
  return {
    skillId: 'nodejs',
    domainId: ros().domainId,
    name: 'NodeJS',
    description: 'Node JS',
  };
};

export const awsSkill = (): Skill => {
  return {
    skillId: 'aws',
    domainId: ros().domainId,
    name: 'AWS',
    description: 'Amazon Web Services',
  };
};

export const devOpsSkill = (): Skill => {
  return {
    skillId: 'devops',
    domainId: ros().domainId,
    name: 'DevOps',
    description: 'Dev ops',
  };
};
