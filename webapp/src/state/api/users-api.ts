import { apiClient } from './api-client';
import { SetupUserData, UserData } from '@domaindocs/lib';

export const usersApi = (() => {
    const setupUser = async (data: SetupUserData): Promise<UserData> => {
        const result = await apiClient.post<UserData>('/users/setup', data);
        return result.data;
    };

    const getAuthUser = async (): Promise<UserData | null> => {
        const result = await apiClient.get<UserData | string>('/users/auth');
        if (typeof result.data === 'string') return null;
        return result.data;
    };

    return {
        getAuthUser,
        setupUser,
    };
})();
