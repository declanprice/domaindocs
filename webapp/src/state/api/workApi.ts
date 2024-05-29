import {
    AddItemAttachmentData,
    AddItemData,
    CreateWorkAreaData,
    DetailedWorkArea,
    DetailedWorkBoard,
    DetailedWorkItem,
    ParentWorkItem,
    UpdateItemAssigneesData,
    UpdateItemParentData,
    UpdateItemReportedByData,
    UpdateItemTypeData,
    WorkAreaPerson,
    WorkItem,
} from '@domaindocs/types';

import { apiClient } from './api-client';
import { queryClient } from '../query-client';
import { produce } from 'immer';
import { UpdateItemDescriptionData } from '../../../../shared/types/src/work-area/update-item-description-data';

export const workApi = () => {
    const search = async (domainId: string): Promise<DetailedWorkArea[]> => {
        const result = await apiClient.get<DetailedWorkArea[]>(`/domains/${domainId}/work-areas`);
        return result.data;
    };

    const searchAreaPeople = async (domainId: string, areaId: string): Promise<WorkAreaPerson[]> => {
        const result = await apiClient.get<WorkAreaPerson[]>(`/domains/${domainId}/work-areas/${areaId}/people`);
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

    const getAvailableParents = async (domainId: string, areaId: string, itemId: string): Promise<ParentWorkItem[]> => {
        const result = await apiClient.get<ParentWorkItem[]>(
            `/domains/${domainId}/work-areas/${areaId}/items/${itemId}/available-parents`,
        );

        return result.data;
    };

    const addItem = async (domainId: string, areaId: string, data: AddItemData) => {
        const { data: item } = await apiClient.post<DetailedWorkItem>(
            `/domains/${domainId}/work-areas/${areaId}/items`,
            data,
        );

        updateLocalItem(domainId, areaId, item.id, item);

        return item;
    };

    const updateReportedBy = async (
        domainId: string,
        areaId: string,
        itemId: string,
        data: UpdateItemReportedByData,
    ) => {
        const { data: item } = await apiClient.post<DetailedWorkItem>(
            `/domains/${domainId}/work-areas/${areaId}/items/${itemId}/reported-by`,
            data,
        );

        updateLocalItem(domainId, areaId, itemId, item);
    };

    const updateItemAssignees = async (
        domainId: string,
        areaId: string,
        itemId: string,
        data: UpdateItemAssigneesData,
    ) => {
        const { data: item } = await apiClient.post<DetailedWorkItem>(
            `/domains/${domainId}/work-areas/${areaId}/items/${itemId}/assignees`,
            data,
        );

        updateLocalItem(domainId, areaId, itemId, item);
    };

    const updateItemParent = async (domainId: string, areaId: string, itemId: string, data: UpdateItemParentData) => {
        const { data: item } = await apiClient.post<DetailedWorkItem>(
            `/domains/${domainId}/work-areas/${areaId}/items/${itemId}/parent`,
            data,
        );

        updateLocalItem(domainId, areaId, itemId, item);
    };

    const updateItemType = async (domainId: string, areaId: string, itemId: string, data: UpdateItemTypeData) => {
        const { data: item } = await apiClient.post<DetailedWorkItem>(
            `/domains/${domainId}/work-areas/${areaId}/items/${itemId}/type`,
            data,
        );

        updateLocalItem(domainId, areaId, itemId, item);
    };

    const updateItemDescription = async (
        domainId: string,
        areaId: string,
        itemId: string,
        data: UpdateItemDescriptionData,
    ) => {
        const { data: item } = await apiClient.post<DetailedWorkItem>(
            `/domains/${domainId}/work-areas/${areaId}/items/${itemId}/description`,
            data,
        );

        updateLocalItem(domainId, areaId, itemId, item);
    };

    const addItemAttachment = async (domainId: string, areaId: string, itemId: string, data: AddItemAttachmentData) => {
        const { data: item } = await apiClient.post<DetailedWorkItem>(
            `/domains/${domainId}/work-areas/${areaId}/items/${itemId}/attachments`,
            data,
        );

        updateLocalItem(domainId, areaId, itemId, item);
    };

    const removeAttachment = async (domainId: string, areaId: string, itemId: string, fileId: string) => {
        const { data: item } = await apiClient.delete<DetailedWorkItem>(
            `/domains/${domainId}/work-areas/${areaId}/items/${itemId}/attachments/${fileId}`,
        );

        updateLocalItem(domainId, areaId, itemId, item);
    };

    const updateLocalItem = (domainId: string, areaId: string, itemId: string, item: DetailedWorkItem) => {
        queryClient.setQueryData(['getItem', { itemId }], item);

        queryClient.setQueryData(['searchItems', { domainId, areaId }], (state) => {
            return produce(state, (items: DetailedWorkItem[]) => {
                const index = items.findIndex((i) => i.id === itemId);

                if (index !== -1) {
                    items[index] = item;
                } else {
                    items.push(item);
                }

                return items;
            });
        });
    };

    return {
        search,
        searchAreaPeople,
        create,
        get,
        getWorkBoard,
        searchItems,
        getItem,
        addItem,
        getAvailableParents,
        updateItemParent,
        updateItemType,
        updateItemAssignees,
        updateReportedBy,
        updateItemDescription,
        addItemAttachment,
        removeAttachment,
    };
};
