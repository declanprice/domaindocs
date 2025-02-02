import {
    CreateSubdomainData,
    DetailedSubdomain,
    EditContactData,
    EditDescriptionData,
    EditLinkData,
    SearchSubdomainsParams,
    Subdomain,
    UpdateNameData,
} from '@domaindocs/types';
import { apiClient } from './api-client';
import { queryClient } from '../query-client';

export const subdomainsApi = (() => {
    const search = async (domainId: string, params: SearchSubdomainsParams = {}): Promise<Subdomain[]> => {
        const result = await apiClient.get<Subdomain[]>(`/domains/${domainId}/subdomains`, {
            params,
        });

        return result.data;
    };

    const create = async (domainId: string, dto: CreateSubdomainData): Promise<void> => {
        await apiClient.post(`/domains/${domainId}/subdomains`, dto);
    };

    const updateDescription = async (
        domainId: string,
        subdomainId: string,
        data: EditDescriptionData,
    ): Promise<void> => {
        const result = await apiClient.post(`/domains/${domainId}/subdomains/${subdomainId}/description`, data);
        updateLocalData(domainId, subdomainId, result.data);
    };

    const updateName = async (domainId: string, subdomainId: string, data: UpdateNameData): Promise<void> => {
        const result = await apiClient.post(`/domains/${domainId}/subdomains/${subdomainId}/name`, data);
        updateLocalData(domainId, subdomainId, result.data);
    };

    const remove = async (domainId: string, subdomainId: string): Promise<void> => {
        await apiClient.delete(`/domains/${domainId}/subdomains/${subdomainId}`);
    };

    const get = async (domainId: string, subdomainId: string): Promise<DetailedSubdomain> => {
        const result = await apiClient.get<DetailedSubdomain>(`/domains/${domainId}/subdomains/${subdomainId}`);
        return result.data;
    };

    const addContact = async (domainId: string, subdomainId: string, data: EditContactData): Promise<void> => {
        const result = await apiClient.post<DetailedSubdomain>(
            `/domains/${domainId}/subdomains/${subdomainId}/contacts`,
            data,
        );
        updateLocalData(domainId, subdomainId, result.data);
    };

    const updateContact = async (
        domainId: string,
        subdomainId: string,
        contactId: string,
        data: EditContactData,
    ): Promise<void> => {
        const result = await apiClient.post<DetailedSubdomain>(
            `/domains/${domainId}/subdomains/${subdomainId}/contacts/${contactId}`,
            data,
        );
        updateLocalData(domainId, subdomainId, result.data);
    };

    const removeContact = async (domainId: string, subdomainId: string, contactId: string): Promise<void> => {
        const result = await apiClient.delete<DetailedSubdomain>(
            `/domains/${domainId}/subdomains/${subdomainId}/contacts/${contactId}`,
        );
        updateLocalData(domainId, subdomainId, result.data);
    };

    const addLink = async (domainId: string, subdomainId: string, data: EditLinkData): Promise<void> => {
        const result = await apiClient.post<DetailedSubdomain>(
            `/domains/${domainId}/subdomains/${subdomainId}/links`,
            data,
        );
        updateLocalData(domainId, subdomainId, result.data);
    };

    const updateLink = async (
        domainId: string,
        subdomainId: string,
        linkId: string,
        data: EditLinkData,
    ): Promise<void> => {
        const result = await apiClient.post<DetailedSubdomain>(
            `/domains/${domainId}/subdomains/${subdomainId}/links/${linkId}`,
            data,
        );
        updateLocalData(domainId, subdomainId, result.data);
    };

    const removeLink = async (domainId: string, subdomainId: string, linkId: string): Promise<void> => {
        const result = await apiClient.delete<DetailedSubdomain>(
            `/domains/${domainId}/subdomains/${subdomainId}/links/${linkId}`,
        );
        updateLocalData(domainId, subdomainId, result.data);
    };

    const updateLocalData = (domainId: string, subdomainId: string, subdomain: DetailedSubdomain) => {
        queryClient.setQueryData(['getSubdomain', { domainId, subdomainId }], subdomain);
    };

    return {
        search,
        create,
        get,
        remove,
        updateName,
        updateDescription,
        addContact,
        updateContact,
        removeContact,
        addLink,
        removeLink,
        updateLink,
    };
})();
