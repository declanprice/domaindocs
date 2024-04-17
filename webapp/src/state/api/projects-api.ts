import {
  CreateProject,
  DetailedProject,
  ProjectOverview,
  SearchProjects,
} from '@domaindocs/lib';

import { apiClient } from './api-client';

import { plainToInstance } from 'class-transformer';

export const projectsApi = (() => {
  const searchProjects = async (
    domainId: string,
    query: SearchProjects = {},
  ): Promise<DetailedProject[]> => {
    const result = await apiClient.get<DetailedProject[]>(
      `/domains/${domainId}/projects`,
      {
        params: query,
      },
    );

    return result.data.map((p) => plainToInstance(DetailedProject, p));
  };

  const getProjectOverview = async (
    domainId: string,
    projectId: string,
  ): Promise<ProjectOverview> => {
    const result = await apiClient.get<ProjectOverview>(
      `/domains/${domainId}/projects/${projectId}/overview`,
    );

    return plainToInstance(ProjectOverview, result.data);
  };

  const createProject = async (
    domainId: string,
    data: CreateProject,
  ): Promise<void> => {
    await apiClient.post(`/domains/${domainId}/projects`, data);
  };

  return {
    searchProjects,
    createProject,
    getProjectOverview,
  };
})();
