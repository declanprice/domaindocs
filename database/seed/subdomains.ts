import { ros } from './domain';

export const supporting = () => {
  return {
    domainId: ros().domainId,
    name: 'Supporting',
    description:
      'Responsible for projects such as Document Management, LR Archive & DeedSearch UI.',
    subdomainId: 'supporting',
  };
};

export const finance = () => {
  return {
    domainId: ros().domainId,
    name: 'Finance',
    description: 'Responsible for projects such as Payments & Accounting.',
    subdomainId: 'finance',
  };
};
