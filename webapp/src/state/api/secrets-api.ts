import { apiClient } from './api-client';
import { SearchSecrets, Secret } from '@domaindocs/lib';

export const secretsApi = (() => {
    const searchSecrets = async (domainId: string, params: SearchSecrets): Promise<Secret[]> => {
        const result = await apiClient.get<Secret[]>(`/domains/${domainId}/secrets`, { params: params });
        return result.data;
    };

    return {
        searchSecrets,
    };
})();
