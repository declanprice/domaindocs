import {
    AddProjectOwnership,
    CreateProject,
    DetailedProject,
    ProjectOverview,
    SearchProjects,
    UpdateProjectDescription,
} from '@domaindocs/lib';

import { apiClient } from './api-client';

import { AddProjectLink } from '../../../../lib/src/project/add-project-link';

export const projectsApi = (() => {
    const searchProjects = async (domainId: string, params: SearchProjects = {}): Promise<DetailedProject[]> => {
        const result = await apiClient.get<DetailedProject[]>(`/domains/${domainId}/projects`, {
            params,
        });

        return result.data;
    };

    const getProjectOverview = async (domainId: string, projectId: string): Promise<ProjectOverview> => {
        const result = await apiClient.get<ProjectOverview>(`/domains/${domainId}/projects/${projectId}/overview`);

        return result.data;
    };

    const createProject = async (domainId: string, data: CreateProject): Promise<void> => {
        await apiClient.post(`/domains/${domainId}/projects`, data);
    };

    const updateDescription = async (
        domainId: string,
        projectId: string,
        data: UpdateProjectDescription,
    ): Promise<void> => {
        await apiClient.put(`/domains/${domainId}/projects/${projectId}/description`, data);
    };

    const addContacts = async (domainId: string, projectId: string, dto: AddProjectOwnership): Promise<void> => {
        await apiClient.put(`/domains/${domainId}/projects/${projectId}/contacts`, dto);
    };

    const addResourceLink = async (domainId: string, projectId: string, dto: AddProjectLink): Promise<void> => {
        await apiClient.put(`/domains/${domainId}/projects/${projectId}/resource-link`, dto);
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
