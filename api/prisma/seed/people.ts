import { Person } from '@prisma/client';
import { benUser, declanUser, natashaUser } from './users';
import { ros } from './domain';

export const declanPerson = (): Person => {
  return {
    personId: 'declan',
    userId: declanUser().userId,
    domainId: ros().domainId,
    contactEmail: 'work@gmail.com',
    contactMobile: '07304624123',
    personalContactMobile: '07304624123',
    personalContactEmail: 'personal@gmail.com',
  };
};

export const benPerson = (): Person => {
  return {
    personId: 'ben',
    userId: benUser().userId,
    domainId: ros().domainId,
    contactEmail: 'work@gmail.com',
    contactMobile: '07304624123',
    personalContactMobile: '07304624123',
    personalContactEmail: 'personal@gmail.com',
  };
};

export const natashaPerson = (): Person => {
  return {
    personId: 'natasha',
    userId: natashaUser().userId,
    domainId: ros().domainId,
    contactEmail: 'work@gmail.com',
    contactMobile: '07304624123',
    personalContactMobile: '07304624123',
    personalContactEmail: 'personal@gmail.com',
  };
};
