import { apiClient } from './api-client';
import { File, SearchFiles } from '@domaindocs/lib';

export const filesApi = (() => {
    const searchFiles = async (domainId: string, params: SearchFiles): Promise<File[]> => {
        const result = await apiClient.get<File[]>(`/domains/${domainId}/files`, { params });
        return result.data;
    };

    return {
        searchFiles,
    };
})();
