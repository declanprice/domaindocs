import { Team } from '@prisma/client';
import { ros } from './domain';
import { finance, supporting } from './subdomains';

export const teamOrion = (): Team => {
  return {
    teamId: 'orion',
    subdomainId: supporting().subdomainId,
    domainId: ros().domainId,
    iconUri: null,
    name: 'Team Orion',
  };
};

export const teamKeplar = (): Team => {
  return {
    teamId: 'keplar',
    subdomainId: finance().subdomainId,
    domainId: ros().domainId,
    iconUri: null,
    name: 'Team Keplar',
  };
};
