import { apiClient } from '@state/api/api-client.ts'

export type CreateDomainData = {
    domainName: string
}

export type Domain = {
    domainId: string
    name: string
    slug: string
}

export const domainApi = (() => {
    const createDomain = async (data: CreateDomainData): Promise<Domain> => {
        const result = await apiClient.post<Domain>('/domains', data)
        return result.data
    }

    const getUserDomains = async (): Promise<Domain[]> => {
        const result = await apiClient.get<Domain[]>('/domains')
        return result.data
    }

    return {
        getUserDomains,
        createDomain,
    }
})()
