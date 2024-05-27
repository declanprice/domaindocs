import { apiClient } from './api-client';

import { Domain, DomainSettings, SendDomainInviteData, SetupDomainData } from '@domaindocs/types';

export const domainsApi = (() => {
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

    const deleteDomain = async (domainId: string): Promise<void> => {};

    return {
        setupDomain,
        sendInvite,
        getSettings,
        deleteDomain,
    };
})();
