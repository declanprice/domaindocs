import { apiClient } from '@state/api/api-client.ts'

export type Domain = {
    domainId: string
    userId: string
    domainName: string
}

export const domainApi = (() => {
    const getUserDomains = async (): Promise<Domain[]> => {
        const result = await apiClient.get<Domain[]>('/domains')
        return result.data
    }

    return {
        getUserDomains,
    }
})()
