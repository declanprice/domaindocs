import { CreateSubdomainData, SearchSubdomainsParams, Subdomain } from '@domaindocs/types';
import { apiClient } from './api-client';

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

    const remove = async (domainId: string, subdomainId: string): Promise<void> => {
        await apiClient.delete(`/domains/${domainId}/subdomains/${subdomainId}`);
    };

    const get = async (domainId: string, subdomainId: string): Promise<Subdomain> => {
        const result = await apiClient.get<Subdomain>(`/domains/${domainId}/subdomains/${subdomainId}`);
        return result.data;
    };

    return {
        search,
        create,
        get,
        remove,
    };
})();
