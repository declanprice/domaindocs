import { apiClient } from '@state/api/api-client.ts'

type SetupUserData = {
    firstName: string
    lastName: string
}

export type AuthUserDomain = {
    domainId: string
    name: string
}

export type AuthUser = {
    userId: string
    email: string
    firstName: string
    lastName: string
    domains: AuthUserDomain[]
}

export type User = {
    userId: string
    email: string
    firstName: string
    lastName: string
    iconUri?: string
    roleName?: string
}

export type UserSearchParams = {
    domainId: string
    name: string
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

    const searchUsers = async (data: UserSearchParams): Promise<User[]> => {
        const result = await apiClient.get<User[]>('/users', {
            params: data,
        })
        return result.data
    }

    return {
        getAuthUser,
        setupUser,
        searchUsers,
    }
})()
