import { CreateWorkAreaData, DetailedWorkArea, DetailedWorkBoard, DetailedWorkItem, WorkItem } from '@domaindocs/types';
import { apiClient } from './api-client';

export const workApi = () => {
    const search = async (domainId: string): Promise<DetailedWorkArea[]> => {
        const result = await apiClient.get<DetailedWorkArea[]>(`/domains/${domainId}/work-areas`);
        return result.data;
    };

    const create = async (domainId: string, data: CreateWorkAreaData) => {
        await apiClient.post<void>(`/domains/${domainId}/work-areas`, data);
    };

    const get = async (domainId: string, areaId: string): Promise<DetailedWorkArea> => {
        const result = await apiClient.get<DetailedWorkArea>(`/domains/${domainId}/work-areas/${areaId}`);
        return result.data;
    };

    const getWorkBoard = async (domainId: string, areaId: string): Promise<DetailedWorkBoard> => {
        const result = await apiClient.get<DetailedWorkBoard>(`/domains/${domainId}/work-areas/${areaId}/board`);
        return result.data;
    };

    const searchItems = async (domainId: string, areaId: string): Promise<WorkItem[]> => {
        const result = await apiClient.get<WorkItem[]>(`/domains/${domainId}/work-areas/${areaId}/items`);
        return result.data;
    };

    const getItem = async (domainId: string, areaId: string, itemId: string): Promise<DetailedWorkItem> => {
        const result = await apiClient.get<DetailedWorkItem>(
            `/domains/${domainId}/work-areas/${areaId}/items/${itemId}`,
        );
        return result.data;
    };

    return {
        search,
        create,
        get,
        getWorkBoard,
        searchItems,
        getItem,
    };
};
