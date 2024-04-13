import { apiClient } from '@state/api/api-client.ts'

export type SetupDomainDto = {
    domainName: string
}

export type Domain = {
    domainId: string
    name: string
}

export const domainsApi = (() => {
    const setupDomain = async (data: SetupDomainDto): Promise<Domain> => {
        const result = await apiClient.post<Domain>('/domains', data)
        return result.data
    }

    return {
        setupDomain: setupDomain,
    }
})()
