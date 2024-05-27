import { apiClient } from './api-client';
import { SetupUserData, User } from '@domaindocs/types';

export const usersApi = (() => {
    const setupUser = async (data: SetupUserData): Promise<User> => {
        const result = await apiClient.post<User>('/users/setup', data);
        return result.data;
    };

    const getAuthUser = async (): Promise<User | null> => {
        const result = await apiClient.get<User | string>('/users/auth');
        if (typeof result.data === 'string') return null;
        return result.data;
    };

    return {
        getAuthUser,
        setupUser,
    };
})();
