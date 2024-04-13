import { Project } from '@prisma/client';
import { ros } from './domain';

export const deedSearchUi = (): Project => {
  return {
    projectId: 'deedsearchui',
    domainId: ros().domainId,
    name: 'Deed Search UI',
    iconUri: undefined,
  };
};

export const deedSearchApi = () => {
  return {
    projectId: 'deedsearchapi',
    domainId: ros().domainId,
    name: 'Deed Search API',
    iconUri: undefined,
  };
};

export const lrArchiveUi = () => {
  return {
    projectId: 'lrarchiveui',
    domainId: ros().domainId,
    name: 'LR Archive UI',
    iconUri: undefined,
  };
};

export const lrArchiveApi = () => {
  return {
    projectId: 'lrarchiveapi',
    domainId: ros().domainId,
    name: 'LR Archive API',
    iconUri: undefined,
  };
};
