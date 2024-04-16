import { apiClient } from './api-client';

import { DomainDto, SetupDomainDto } from '@domaindocs/lib';

import { plainToInstance } from 'class-transformer';

export const domainsApi = (() => {
  const setupDomain = async (data: SetupDomainDto): Promise<DomainDto> => {
    const result = await apiClient.post<DomainDto>('/domains', data);
    return plainToInstance(DomainDto, result.data);
  };

  return {
    setupDomain: setupDomain,
  };
})();
