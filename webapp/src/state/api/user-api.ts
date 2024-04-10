import { apiClient } from '@state/api/api-client.ts'

type SetupUserData = {
    firstName: string
    lastName: string
}

export type User = {
    userId: string
    email: string
    firstName: string
    lastName: string
}

export const userApi = (() => {
    const setupUser = async (data: SetupUserData): Promise<User> => {
        const result = await apiClient.post<User>('/users/setup', data)

        return result.data
    }

    const getAuthUser = async (): Promise<User | null> => {
        const result = await apiClient.get<User | string>('/users/auth')

        if (typeof result.data === 'string') return null

        return result.data
    }

    return {
        getAuthUser,
        setupUser,
    }
})()
