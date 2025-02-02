import { apiClient } from './api-client';

import {
    DetailedDomain,
    Domain,
    DomainUser,
    DomainSettings,
    EditContactData,
    EditDescriptionData,
    EditLinkData,
    PagedResult,
    SearchDomainUsersParams,
    SendDomainInviteData,
    SetupDomainData,
    SearchDomainInvitesParams,
    DomainInvite,
    UpdateNameData,
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
        await invalidateInvitesQuery();
    };

    const getSettings = async (domainId: string): Promise<DomainSettings> => {
        const result = await apiClient.get<DomainSettings>(`/domains/${domainId}/settings`);
        return result.data;
    };

    const searchUsers = async (domainId: string, params: SearchDomainUsersParams): Promise<PagedResult<DomainUser>> => {
        const result = await apiClient.get<PagedResult<DomainUser>>(`/domains/${domainId}/users`, {
            params,
        });

        return result.data;
    };

    const searchInvites = async (
        domainId: string,
        params: SearchDomainInvitesParams,
    ): Promise<PagedResult<DomainInvite>> => {
        const result = await apiClient.get<PagedResult<DomainInvite>>(`/domains/${domainId}/invites`, {
            params,
        });

        return result.data;
    };

    const resendInvite = async (domainId: string, email: string): Promise<void> => {
        await apiClient.post(`/domains/${domainId}/invites/${email}/resend`);
    };

    const removeInvite = async (domainId: string, email: string): Promise<void> => {
        await apiClient.delete(`/domains/${domainId}/invites/${email}`);
        await invalidateInvitesQuery();
    };

    const updateName = async (domainId: string, data: UpdateNameData): Promise<void> => {
        await apiClient.post(`/domains/${domainId}/name`, data);
    };

    const updateDescription = async (domainId: string, data: EditDescriptionData): Promise<void> => {
        const result = await apiClient.post(`/domains/${domainId}/description`, data);
        updateLocalData(domainId, result.data);
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

    const invalidateInvitesQuery = async () => {
        await queryClient.invalidateQueries({
            queryKey: ['searchDomainInvites'],
            exact: false,
        });
    };

    return {
        getDomain,
        searchUsers,
        searchInvites,
        resendInvite,
        removeInvite,
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
