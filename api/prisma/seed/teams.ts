import { Team } from '@prisma/client';
import { ros } from './domain';

export const teamOrion = (): Team => {
  return {
    teamId: 'orion',
    domainId: ros().domainId,
    iconUri: undefined,
    name: 'Team Orion',
  };
};

export const teamKeplar = (): Team => {
  return {
    teamId: 'keplar',
    domainId: ros().domainId,
    iconUri: undefined,
    name: 'Team Keplar',
  };
};
