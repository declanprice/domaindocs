import { apiClient } from './api-client';

export type CreateSubdomainData = {
  domainId: string;
  subdomainName: string;
};

export type Subdomain = {
  domainId: string;
  subdomainId: string;
  name: string;
  description: string;
};

export type SubdomainContact = {
  personId: string;
  userId: string;
  firstName: string;
  lastName: string;
  roleName?: string;
  iconUri?: string;
};

export type SubdomainResourceLink = {
  linkId: string;
  title: string;
  subTitle: string;
  href: string;
  iconUri?: string;
};

export type SubdomainSummary = {
  peopleCount: number;
  teamCount: number;
  projectCount: number;
  description: string;
};

export type SubdomainOverview = {
  name: string;
  summary: SubdomainSummary;
  resourceLinks: SubdomainResourceLink[];
  contacts: SubdomainContact[];
};

export type SubdomainSearch = {
  domainId: string;
};

export type AddResourceLinkData = {
  title: string;
  subTitle: string;
  href: string;
  iconUri?: string;
};

export const subdomainsApi = (() => {
  const createSubdomain = async (
    domainId: string,
    data: CreateSubdomainData,
  ): Promise<Subdomain> => {
    const result = await apiClient.post<Subdomain>(
      `/domains/${domainId}/subdomains`,
      data,
    );
    return result.data;
  };

  const getById = async (
    domainId: string,
    subdomainId: string,
  ): Promise<Subdomain> => {
    const result = await apiClient.get<Subdomain>(
      `/domains/${domainId}/subdomains/${subdomainId}`,
    );
    return result.data;
  };

  const getOverviewById = async (
    domainId: string,
    subdomainId: string,
  ): Promise<SubdomainOverview> => {
    const result = await apiClient.get<SubdomainOverview>(
      `/domains/${domainId}/subdomains/${subdomainId}/overview`,
    );

    return result.data;
  };

  const searchSubdomains = async (domainId: string): Promise<Subdomain[]> => {
    const result = await apiClient.get<Subdomain[]>(
      `/domains/${domainId}/subdomains`,
    );

    return result.data;
  };

  const updateDescription = async (
    domainId: string,
    subdomainId: string,
    description: string,
  ): Promise<Subdomain> => {
    const result = await apiClient.put<Subdomain>(
      `/domains/${domainId}/subdomains/${subdomainId}/description`,
      {
        description: description,
      },
    );

    return result.data;
  };

  const addContacts = async (
    domainId: string,
    subdomainId: string,
    contacts: SubdomainContact[],
  ): Promise<Subdomain> => {
    const result = await apiClient.put(
      `/domains/${domainId}/subdomains/${subdomainId}/contacts`,
      {
        personIds: contacts.map((p) => p.personId),
      },
    );

    return result.data;
  };

  const addResourceLink = async (
    domainId: string,
    subdomainId: string,
    data: AddResourceLinkData,
  ): Promise<AddResourceLinkData> => {
    const result = await apiClient.put(
      `/domains/${domainId}/subdomains/${subdomainId}/resource-link`,
      data,
    );

    return result.data;
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
