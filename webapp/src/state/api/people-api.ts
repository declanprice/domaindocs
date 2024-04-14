import { apiClient } from '@state/api/api-client.ts'

export type PersonSubdomain = {
    subdomainId: string
    subdomainName: string
}

export type PersonTeam = {
    teamId: string
    teamName: string
}

export type Person = {
    personId: string
    userId: string
    email: string
    firstName: string
    lastName: string
    iconUri: string | undefined
    roleName: string | undefined
    skills: string[]
    subdomains: PersonSubdomain[]
    teams: PersonTeam[]
}

export type SearchPeopleParams = {
    name?: string
    subdomainId?: string
}

export const peopleApi = (() => {
    const searchPeople = async (
        domainId: string,
        data: SearchPeopleParams
    ): Promise<Person[]> => {
        const result = await apiClient.get<Person[]>(
            `/domains/${domainId}/people`,
            {
                params: data,
            }
        )

        return result.data
    }

    return {
        searchPeople,
    }
})()
