import { apiClient } from './api-client';

import { DomainDto, SetupDomainDto } from '@domaindocs/lib';

export const domainsApi = (() => {
    const setupDomain = async (data: SetupDomainDto): Promise<DomainDto> => {
        const result = await apiClient.post<DomainDto>('/domains', data);
        return result.data;
    };

    return {
        setupDomain: setupDomain,
    };
})();
