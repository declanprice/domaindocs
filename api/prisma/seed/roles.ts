import { Role } from '@prisma/client';
import { benUser, declanUser, natashaUser } from './users';
import { ros } from './domain';
import { benPerson, declanPerson, natashaPerson } from './people';

export const declanRole = (): Role => {
  return {
    roleId: 'declan',
    personId: declanPerson().personId,
    userId: declanUser().userId,
    domainId: ros().domainId,
    name: 'Employee',
  };
};

export const benRole = (): Role => {
  return {
    roleId: 'ben',
    personId: benPerson().personId,
    userId: benUser().userId,
    domainId: ros().domainId,
    name: 'Employee',
  };
};

export const natashaRole = (): Role => {
  return {
    roleId: 'natasha',
    personId: natashaPerson().personId,
    userId: natashaUser().userId,
    domainId: ros().domainId,
    name: 'Employee',
  };
};
