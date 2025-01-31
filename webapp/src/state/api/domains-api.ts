import { apiClient } from './api-client';

import {
    DetailedDomain,
    Domain,
    DomainSettings,
    EditContactData,
    EditDomainDescriptionData,
    EditLinkData,
    SendDomainInviteData,
    SetupDomainData,
    UpdateDomainNameData,
} from '@domaindocs/types';

import { queryClient } from '../query-client';

export const domainsApi = (() => {
    const getDomain = async (domainId: string): Promise<DetailedDomain> => {
        const result = await apiClient.get(`/domains/${domainId}`);
        return result.data;
    };

    const setupDomain = async (data: SetupDomainData): Promise<Domain> => {
        const result = await apiClient.post<Domain>('/domains', data);
        return result.data;
    };

    const sendInvite = async (domainId: string, data: SendDomainInviteData): Promise<void> => {
        await apiClient.post(`/domains/${domainId}/send-invite`, data);
    };

    const getSettings = async (domainId: string): Promise<DomainSettings> => {
        const result = await apiClient.get<DomainSettings>(`/domains/${domainId}/settings`);
        return result.data;
    };

    const updateName = async (domainId: string, data: UpdateDomainNameData): Promise<void> => {
        await apiClient.post(`/domains/${domainId}/name`, data);
    };

    const updateDescription = async (domainId: string, data: EditDomainDescriptionData): Promise<void> => {
        await apiClient.post(`/domains/${domainId}/description`, data);
    };

    const deleteDomain = async (domainId: string): Promise<void> => {
        await apiClient.delete(`/domains/${domainId}`);
    };

    const addContact = async (domainId: string, data: EditContactData): Promise<void> => {
        const result = await apiClient.post<Domain>(`/domains/${domainId}/contacts`, data);
        updateLocalData(domainId, result.data);
    };

    const updateContact = async (domainId: string, contactId: string, data: EditContactData): Promise<void> => {
        const result = await apiClient.post<Domain>(`/domains/${domainId}/contacts/${contactId}`, data);
        updateLocalData(domainId, result.data);
    };

    const removeContact = async (domainId: string, contactId: string): Promise<void> => {
        const result = await apiClient.delete<Domain>(`/domains/${domainId}/contacts/${contactId}`);
        updateLocalData(domainId, result.data);
    };

    const addLink = async (domainId: string, data: EditLinkData): Promise<void> => {
        const result = await apiClient.post<Domain>(`/domains/${domainId}/links`, data);
        updateLocalData(domainId, result.data);
    };

    const updateLink = async (domainId: string, linkId: string, data: EditLinkData): Promise<void> => {
        const result = await apiClient.post<Domain>(`/domains/${domainId}/links/${linkId}`, data);
        updateLocalData(domainId, result.data);
    };

    const removeLink = async (domainId: string, linkId: string): Promise<void> => {
        const result = await apiClient.delete<Domain>(`/domains/${domainId}/links/${linkId}`);
        updateLocalData(domainId, result.data);
    };

    const updateLocalData = (domainId: string, domain: Domain) => {
        queryClient.setQueryData(['getDomain', { domainId }], domain);
    };

    return {
        getDomain,
        setupDomain,
        sendInvite,
        getSettings,
        updateName,
        updateDescription,
        deleteDomain,
        addContact,
        updateContact,
        removeContact,
        addLink,
        updateLink,
        removeLink,
    };
})();
