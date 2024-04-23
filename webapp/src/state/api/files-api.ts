import { apiClient } from './api-client';
import { File, SearchFiles } from '@domaindocs/lib';
import { SignedFileUrl } from '../../../../lib/src/file/signed-file-url';

export const filesApi = (() => {
    const searchFiles = async (domainId: string, params: SearchFiles): Promise<File[]> => {
        const result = await apiClient.get<File[]>(`/domains/${domainId}/files`, { params });
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
