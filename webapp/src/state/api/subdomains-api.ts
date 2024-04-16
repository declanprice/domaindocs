import { apiClient } from './api-client';
import {
  AddSubdomainContactsDto,
  AddSubdomainResourceLinkDto,
  CreateSubdomainDto,
  SubdomainDto,
  SubdomainOverviewDto,
  UpdateSubdomainDescriptionDto,
} from '@domaindocs/lib';
import { plainToInstance } from 'class-transformer';

export const subdomainsApi = (() => {
  const createSubdomain = async (
    domainId: string,
    data: CreateSubdomainDto,
  ): Promise<SubdomainDto> => {
    const result = await apiClient.post<SubdomainDto>(
      `/domains/${domainId}/subdomains`,
      data,
    );

    return plainToInstance(SubdomainDto, result.data);
  };

  const getById = async (
    domainId: string,
    subdomainId: string,
  ): Promise<SubdomainDto> => {
    const result = await apiClient.get<SubdomainDto>(
      `/domains/${domainId}/subdomains/${subdomainId}`,
    );

    return plainToInstance(SubdomainDto, result.data);
  };

  const getOverviewById = async (
    domainId: string,
    subdomainId: string,
  ): Promise<SubdomainOverviewDto> => {
    const result = await apiClient.get<SubdomainOverviewDto>(
      `/domains/${domainId}/subdomains/${subdomainId}/overview`,
    );

    return plainToInstance(SubdomainOverviewDto, result.data);
  };

  const searchSubdomains = async (
    domainId: string,
  ): Promise<SubdomainDto[]> => {
    const result = await apiClient.get<SubdomainDto[]>(
      `/domains/${domainId}/subdomains`,
    );

    return plainToInstance(SubdomainDto, result.data);
  };

  const updateDescription = async (
    domainId: string,
    subdomainId: string,
    dto: UpdateSubdomainDescriptionDto,
  ): Promise<void> => {
    await apiClient.put(
      `/domains/${domainId}/subdomains/${subdomainId}/description`,
      dto,
    );
  };

  const addContacts = async (
    domainId: string,
    subdomainId: string,
    dto: AddSubdomainContactsDto,
  ): Promise<void> => {
    await apiClient.put(
      `/domains/${domainId}/subdomains/${subdomainId}/contacts`,
      dto,
    );
  };

  const addResourceLink = async (
    domainId: string,
    subdomainId: string,
    dto: AddSubdomainResourceLinkDto,
  ): Promise<void> => {
    await apiClient.put(
      `/domains/${domainId}/subdomains/${subdomainId}/resource-link`,
      dto,
    );
  };

  return {
    createSubdomain,
    searchSubdomains,
    getById,
    getOverviewById,
    updateDescription,
    addContacts,
    addResourceLink,
  };
})();
