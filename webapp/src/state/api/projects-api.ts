import {
    AddProjectOwnership,
    CreateProject,
    DetailedProject,
    ProjectOverview,
    SearchProjects,
    UpdateProjectDescription,
    AddProjectLink,
} from '@domaindocs/lib';

import { apiClient } from './api-client';

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

    const addOwnership = async (domainId: string, projectId: string, dto: AddProjectOwnership): Promise<void> => {
        await apiClient.put(`/domains/${domainId}/projects/${projectId}/ownership`, dto);
    };

    const addLink = async (domainId: string, projectId: string, dto: AddProjectLink): Promise<void> => {
        await apiClient.put(`/domains/${domainId}/projects/${projectId}/resource-link`, dto);
    };

    return {
        searchProjects,
        createProject,
        getProjectOverview,
        updateDescription,
        addOwnership,
        addLink,
    };
})();
