import { apiClient } from '@state/api/api-client.ts'

export type CreateSubdomainData = {
    domainId: string
    subdomainName: string
}

export type Subdomain = {
    domainId: string
    subdomainId: string
    name: string
    description: string
}

export type SubdomainContact = {
    userId: string
    firstName: string
    lastName: string
    role?: string
    avatarUri?: string
}

export type SubdomainResourceLink = {
    linkId: string
    title: string
    subTitle: string
    href: string
    iconUri?: string
}

export type SubdomainSummary = {
    peopleCount: number
    teamCount: number
    projectCount: number
    description: string
}

export type SubdomainOverview = {
    name: string
    summary: SubdomainSummary
    resourceLinks: SubdomainResourceLink[]
    contacts: SubdomainContact[]
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

    const getById = async (subdomainId: string): Promise<Subdomain> => {
        const result = await apiClient.get<Subdomain>(
            `/subdomains/${subdomainId}`
        )
        return result.data
    }

    const getOverviewById = async (
        subdomainId: string
    ): Promise<SubdomainOverview> => {
        const result = await apiClient.get<SubdomainOverview>(
            `/subdomains/${subdomainId}/overview`
        )

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

    const updateDescription = async (
        subdomainId: string,
        description: string
    ): Promise<Subdomain> => {
        const result = await apiClient.put<Subdomain>(
            `/subdomains/${subdomainId}/description`,
            {
                description: description,
            }
        )

        return result.data
    }
    return {
        createSubdomain,
        searchSubdomains,
        getById,
        getOverviewById,
        updateDescription,
    }
})()
