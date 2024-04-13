import { apiClient } from '@state/api/api-client.ts'

export type SubdomainTeam = {
    readonly subdomainId: string
    readonly subdomainName: string
}

export type TeamPersonDto = {
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
    subdomains: SubdomainTeam[]
    people: TeamPersonDto[]
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
