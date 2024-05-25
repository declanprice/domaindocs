import { apiClient } from './api-client';
import { DetailedFile, File, SearchFilesParams, SignedFileUrl } from '@domaindocs/types';

export const filesApi = (() => {
    const searchFiles = async (domainId: string, params: SearchFilesParams): Promise<DetailedFile[]> => {
        const result = await apiClient.get<DetailedFile[]>(`/domains/${domainId}/files`, { params });
        return result.data;
    };

    const getSignedUrl = async (domainId: string, fileId: string): Promise<SignedFileUrl> => {
        const result = await apiClient.get<SignedFileUrl>(`/domains/${domainId}/files/${fileId}/signed-url`);
        return result.data;
    };

    return {
        searchFiles,
        getSignedUrl,
    };
})();
