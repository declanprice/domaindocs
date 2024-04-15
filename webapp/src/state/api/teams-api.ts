import { apiClient } from '@state/api/api-client.ts'

export type TeamSubdomain = {
    readonly subdomainId: string
    readonly subdomainName: string
}

export type TeamMember = {
    readonly personId: string
    readonly firstName: string
    readonly lastName: string
    readonly iconUri?: string
}

export type TeamProject = {
    projectId: string
    projectName: string
}

export type Team = {
    readonly teamId: string
    name: string
    subdomain: TeamSubdomain
    members: TeamMember[]
    projects: TeamProject[]
}

export type SearchTeamsQuery = {
    name?: string
}

export type CreateTeamData = {
    name: string
    subdomainId: string
}

export const teamsApi = (() => {
    const searchTeams = async (
        domainId: string,
        query: SearchTeamsQuery = {}
    ): Promise<Team[]> => {
        const result = await apiClient.get<Team[]>(
            `/domains/${domainId}/teams`,
            {
                params: query,
            }
        )

        return result.data
    }

    const createTeam = async (domainId: string, data: CreateTeamData) => {
        const result = await apiClient.post(`/domains/${domainId}/teams`, data)

        return result.data
    }

    return {
        searchTeams,
        createTeam,
    }
})()
