import { apiClient } from '@state/api/api-client.ts'

import { CreateProjectDto, DetailedProjectDto, SearchProjectsDto } from 'lib'

export const projectsApi = (() => {
    const searchProjects = async (
        domainId: string,
        query: SearchProjectsDto = {}
    ): Promise<DetailedProjectDto[]> => {
        const result = await apiClient.get<DetailedProjectDto[]>(
            `/domains/${domainId}/projects`,
            {
                params: query,
            }
        )

        return result.data
    }

    const createProject = async (domainId: string, data: CreateProjectDto) => {
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
