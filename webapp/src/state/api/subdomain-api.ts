import { apiClient } from '@state/api/api-client.ts'

export type CreateSubdomainData = {
    domainId: string
    subdomainName: string
}

export type Subdomain = {
    domainId: string
    subdomainId: string
    name: string
}

export type SubdomainSearch = {
    domainId: string
}

export const subdomainApi = (() => {
    const createSubdomain = async (
        data: CreateSubdomainData
    ): Promise<Subdomain> => {
        const result = await apiClient.post<Subdomain>('/subdomains', data)
        return result.data
    }

    const searchSubdomains = async (
        search: SubdomainSearch
    ): Promise<Subdomain[]> => {
        const result = await apiClient.get<Subdomain[]>('/subdomains', {
            params: search,
        })

        return result.data
    }

    return {
        createSubdomain,
        searchSubdomains,
    }
})()
