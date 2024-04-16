import { Project } from '@prisma/client';
import { ros } from './domain';
import { teamKeplar, teamOrion } from './teams';

export const deedSearchUi = (): Project => {
  return {
    projectId: 'deedsearchui',
    teamId: teamOrion().teamId,
    domainId: ros().domainId,
    name: 'Deed Search UI',
    iconUri: null,
  };
};

export const deedSearchApi = () => {
  return {
    projectId: 'deedsearchapi',
    teamId: teamOrion().teamId,
    domainId: ros().domainId,
    name: 'Deed Search API',
    iconUri: null,
  };
};

export const lrArchiveUi = () => {
  return {
    projectId: 'lrarchiveui',
    teamId: teamKeplar().teamId,
    domainId: ros().domainId,
    name: 'LR Archive UI',
    iconUri: null,
  };
};

export const lrArchiveApi = () => {
  return {
    projectId: 'lrarchiveapi',
    teamId: teamKeplar().teamId,
    domainId: ros().domainId,
    name: 'LR Archive API',
    iconUri: null,
  };
};
