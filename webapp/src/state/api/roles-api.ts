import { apiClient } from './api-client';
import { Role, SearchRolesParams } from '@domaindocs/lib';

export const rolesApi = (() => {
    const search = async (domainId: string, params: SearchRolesParams): Promise<Role[]> => {
        const result = await apiClient.get<Role[]>(`/domains/${domainId}/roles`, { params });
        return result.data;
    };

    return {
        search,
    };
})();
