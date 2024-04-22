import { ros } from './domain';
import { finance, supporting } from './subdomains';

export const teamOrion = () => {
  return {
    teamId: 'orion',
    subdomainId: supporting().subdomainId,
    domainId: ros().domainId,
    iconUri: null,
    name: 'Team Orion',
  };
};

export const teamKeplar = () => {
  return {
    teamId: 'keplar',
    subdomainId: finance().subdomainId,
    domainId: ros().domainId,
    iconUri: null,
    name: 'Team Keplar',
  };
};
