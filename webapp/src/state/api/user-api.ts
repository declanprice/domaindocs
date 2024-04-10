import { apiClient } from '@state/api/api-client.ts'

type SetupUserData = {
    firstName: string
    lastName: string
}

export type AuthUserDomain = {
    domainId: string
    slug: string
    name: string
}

export type AuthUser = {
    userId: string
    email: string
    firstName: string
    lastName: string
    domains: AuthUserDomain[]
}

export const userApi = (() => {
    const setupUser = async (data: SetupUserData): Promise<AuthUser> => {
        const result = await apiClient.post<AuthUser>('/users/setup', data)

        return result.data
    }

    const getAuthUser = async (): Promise<AuthUser | null> => {
        const result = await apiClient.get<AuthUser | string>('/users/auth')

        if (typeof result.data === 'string') return null

        return result.data
    }

    return {
        getAuthUser,
        setupUser,
    }
})()
