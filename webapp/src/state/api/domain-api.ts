import { apiClient } from '@state/api/api-client.ts'

export type SetupDomainDto = {
    domainName: string
}

export type Domain = {
    domainId: string
    name: string
}

export const domainApi = (() => {
    const setupDomain = async (data: SetupDomainDto): Promise<Domain> => {
        const result = await apiClient.post<Domain>('/domains', data)
        return result.data
    }

    const getUserDomains = async (): Promise<Domain[]> => {
        const result = await apiClient.get<Domain[]>('/domains')
        return result.data
    }

    return {
        getUserDomains,
        setupDomain: setupDomain,
    }
})()
