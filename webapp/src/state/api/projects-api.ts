import { apiClient } from '@state/api/api-client.ts'

import { DetailedProjectDto } from 'lib'

export type SearchProjectsQuery = {
    name?: string
}

export type CreateProjectData = {
    name: string
    teamId: string
}

export const projectsApi = (() => {
    const searchProjects = async (
        domainId: string,
        query: SearchProjectsQuery = {}
    ): Promise<DetailedProjectDto[]> => {
        const result = await apiClient.get<DetailedProjectDto[]>(
            `/domains/${domainId}/projects`,
            {
                params: query,
            }
        )

        return result.data
    }

    const createProject = async (domainId: string, data: CreateProjectData) => {
        const result = await apiClient.post(
            `/domains/${domainId}/projects`,
            data
        )

        return result.data
    }

    return {
        searchProjects,
        createProject,
    }
})()
