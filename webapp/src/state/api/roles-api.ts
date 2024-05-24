import { apiClient } from './api-client';
import { CreateRoleData, Role, SearchRolesParams } from '@domaindocs/lib';

export const rolesApi = (() => {
    const search = async (domainId: string, params: SearchRolesParams = {}): Promise<Role[]> => {
        const result = await apiClient.get<Role[]>(`/domains/${domainId}/roles`, { params });
        return result.data;
    };

    const create = async (domainId: string, data: CreateRoleData): Promise<Role> => {
        const result = await apiClient.post<Role>(`/domains/${domainId}/roles`, data);
        return result.data;
    };

    return {
        search,
        create,
    };
})();
