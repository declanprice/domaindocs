import {
  AddProjectContacts,
  CreateProject,
  DetailedProject,
  ProjectOverview,
  SearchProjects,
  UpdateProjectDescription,
} from '@domaindocs/lib';

import { apiClient } from './api-client';

import { plainToInstance } from 'class-transformer';
import { AddProjectResourceLink } from '../../../../lib/src/project/add-project-resource-link';

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

  const updateDescription = async (
    domainId: string,
    projectId: string,
    data: UpdateProjectDescription,
  ): Promise<void> => {
    await apiClient.put(
      `/domains/${domainId}/projects/${projectId}/description`,
      data,
    );
  };

  const addContacts = async (
    domainId: string,
    projectId: string,
    dto: AddProjectContacts,
  ): Promise<void> => {
    await apiClient.put(
      `/domains/${domainId}/projects/${projectId}/contacts`,
      dto,
    );
  };

  const addResourceLink = async (
    domainId: string,
    projectId: string,
    dto: AddProjectResourceLink,
  ): Promise<void> => {
    await apiClient.put(
      `/domains/${domainId}/projects/${projectId}/resource-link`,
      dto,
    );
  };

  return {
    searchProjects,
    createProject,
    getProjectOverview,
    updateDescription,
    addContacts,
    addResourceLink,
  };
})();
