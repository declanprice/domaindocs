import { apiClient } from './api-client';
import { SetupUserDto, UserDto } from '@domaindocs/lib';
import { plainToInstance } from 'class-transformer';

export const usersApi = (() => {
  const setupUser = async (data: SetupUserDto): Promise<UserDto> => {
    const result = await apiClient.post<UserDto>('/users/setup', data);
    return plainToInstance(UserDto, result.data);
  };

  const getAuthUser = async (): Promise<UserDto | null> => {
    const result = await apiClient.get<UserDto | string>('/users/auth');
    if (typeof result.data === 'string') return null;
    return plainToInstance(UserDto, result.data);
  };

  return {
    getAuthUser,
    setupUser,
  };
})();
