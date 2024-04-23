import { apiClient } from './api-client';
import { AddDocumentation, Documentation, SearchDocumentation, ViewDocumentation } from '@domaindocs/lib';

export const documentationApi = (() => {
    const search = async (domainId: string, params: SearchDocumentation): Promise<Documentation[]> => {
        const result = await apiClient.get<Documentation[]>(`/domains/${domainId}/documentation`, {
            params,
        });

        return result.data;
    };

    const get = async (domainId: string, documentationId: string): Promise<ViewDocumentation> => {
        const result = await apiClient.get<ViewDocumentation>(`/domains/${domainId}/documentation/${documentationId}`);

        return result.data;
    };

    const add = async (domainId: string, documentationId: string, data: AddDocumentation) => {
        await apiClient.post<Documentation>(`/domains/${domainId}/documentation/${documentationId}/add`, data);
    };

    const remove = async (domainId: string, documentationId: string) => {
        await apiClient.delete<Documentation>(`/domains/${domainId}/documentation/${documentationId}`);
    };

    return {
        search,
        get,
        add,
        remove,
    };
})();
