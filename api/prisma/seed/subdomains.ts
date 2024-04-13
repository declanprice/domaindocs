import { Subdomain } from '@prisma/client';
import { ros } from './domain';

export const supporting = (): Subdomain => {
  return {
    domainId: ros().domainId,
    name: 'Supporting',
    description:
      'Responsible for projects such as Document Management, LR Archive & DeedSearch UI.',
    subdomainId: 'supporting',
  };
};
