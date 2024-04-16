import { apiClient } from './api-client';

type SetupUserData = {
  firstName: string;
  lastName: string;
};

export type AuthUserDomain = {
  domainId: string;
  name: string;
};

export type User = {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  iconUri?: string;
};

export type UserWithDomains = {
  domains: AuthUserDomain[];
} & User;

export const usersApi = (() => {
  const setupUser = async (data: SetupUserData): Promise<UserWithDomains> => {
    const result = await apiClient.post<UserWithDomains>('/users/setup', data);

    return result.data;
  };

  const getAuthUser = async (): Promise<UserWithDomains | null> => {
    const result = await apiClient.get<UserWithDomains | string>('/users/auth');

    if (typeof result.data === 'string') return null;

    return result.data;
  };

  return {
    getAuthUser,
    setupUser,
  };
})();
