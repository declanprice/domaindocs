import { apiClient } from './api-client';
import { File } from '@domaindocs/lib';

export const filesApi = (() => {
    const searchFiles = async (domainId: string): Promise<File[]> => {
        const result = await apiClient.get<File[]>(`/domains/${domainId}/files`, {});
        return result.data;
    };

    return {
        searchFiles,
    };
})();
