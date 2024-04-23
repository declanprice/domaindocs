import { apiClient } from './api-client';
import { Secret } from '@domaindocs/lib';

export const secretsApi = (() => {
    const searchSecrets = async (domainId: string): Promise<Secret[]> => {
        const result = await apiClient.get<Secret[]>(`/domains/${domainId}/secrets`, {});
        return result.data;
    };

    return {
        searchSecrets,
    };
})();
