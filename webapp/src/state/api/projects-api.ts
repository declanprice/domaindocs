import {
  CreateProjectDto,
  DetailedProjectDto,
  SearchProjectsDto,
} from '@domaindocs/lib';

import { apiClient } from './api-client';

import { plainToInstance } from 'class-transformer';

export const projectsApi = (() => {
  const searchProjects = async (
    domainId: string,
    query: SearchProjectsDto = {},
  ): Promise<DetailedProjectDto[]> => {
    const result = await apiClient.get<DetailedProjectDto[]>(
      `/domains/${domainId}/projects`,
      {
        params: query,
      },
    );

    return result.data.map((p) => plainToInstance(DetailedProjectDto, p));
  };

  const createProject = async (
    domainId: string,
    data: CreateProjectDto,
  ): Promise<void> => {
    await apiClient.post(`/domains/${domainId}/projects`, data);
  };

  return {
    searchProjects,
    createProject,
  };
})();
