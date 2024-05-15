import { apiClient } from './api-client';

import { Domain, SetupDomainData } from '@domaindocs/lib';

export const domainsApi = (() => {
    const setupDomain = async (data: SetupDomainData): Promise<Domain> => {
        const result = await apiClient.post<Domain>('/domains', data);
        return result.data;
    };

    return {
        setupDomain: setupDomain,
    };
})();
