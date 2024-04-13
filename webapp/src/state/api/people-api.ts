import { apiClient } from '@state/api/api-client.ts'

export type Person = {
    userId: string
    email: string
    firstName: string
    lastName: string
    iconUri?: string
    roleName?: string
}

export type SearchPeopleParams = {
    name: string
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
