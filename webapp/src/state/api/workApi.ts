import { CreateWorkAreaData, DetailedWorkArea, DetailedWorkBoard } from '@domaindocs/types';
import { apiClient } from './api-client';

export const workApi = () => {
    const search = async (domainId: string): Promise<DetailedWorkArea[]> => {
        const result = await apiClient.get<DetailedWorkArea[]>(`/domains/${domainId}/work-areas`);
        return result.data;
    };

    const create = async (domainId: string, data: CreateWorkAreaData) => {
        await apiClient.post<void>(`/domains/${domainId}/work-areas`, data);
    };

    const getWorkBoard = async (domainId: string, areaId: string): Promise<DetailedWorkBoard> => {
        const result = await apiClient.get<DetailedWorkBoard>(`/domains/${domainId}/work-areas/${areaId}/board`);
        return result.data;
    };

    return {
        search,
        create,
        getWorkBoard,
    };
};
