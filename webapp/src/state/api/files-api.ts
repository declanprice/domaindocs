import { apiClient } from './api-client';
import { FileWithSignedUrl, GenerateFileSignedUrlData } from '@domaindocs/types';

export const filesApi = (() => {
    const generateUploadUrl = async (domainId: string, data: GenerateFileSignedUrlData): Promise<FileWithSignedUrl> => {
        const result = await apiClient.post<FileWithSignedUrl>(`/domains/${domainId}/files`, data);
        return result.data;
    };

    const uploadFile = async (file: FileWithSignedUrl, data: File) => {
        await apiClient.put(file.url, data, {
            headers: {
                'Content-Type': file.type,
            },
        });
    };

    return {
        generateUploadUrl,
        uploadFile,
    };
})();
