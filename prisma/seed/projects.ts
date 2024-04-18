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
    description: '',
  };
};

export const deedSearchApi = (): Project => {
  return {
    projectId: 'deedsearchapi',
    teamId: teamOrion().teamId,
    domainId: ros().domainId,
    name: 'Deed Search API',
    iconUri: null,
    description: '',
  };
};

export const lrArchiveUi = (): Project => {
  return {
    projectId: 'lrarchiveui',
    teamId: teamKeplar().teamId,
    domainId: ros().domainId,
    name: 'LR Archive UI',
    iconUri: null,
    description: '',
  };
};

export const lrArchiveApi = (): Project => {
  return {
    projectId: 'lrarchiveapi',
    teamId: teamKeplar().teamId,
    domainId: ros().domainId,
    name: 'LR Archive API',
    iconUri: null,
    description: '',
  };
};
