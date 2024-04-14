import { apiClient } from '@state/api/api-client.ts'

export type TeamSubdomain = {
    readonly subdomainId: string
    readonly subdomainName: string
}

export type TeamPerson = {
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
    subdomains: TeamSubdomain[]
    people: TeamPerson[]
    projects: TeamProject[]
}

type SearchTeamsQuery = {
    name?: string
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

    return {
        searchTeams,
    }
})()
