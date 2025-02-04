import {
    CreateComponentData,
    SearchComponentsParams,
    EditComponentDescriptionData,
    EditComponentLinkData,
    SearchComponent,
    DetailedComponent,
    EditComponentOwnershipData,
    EditComponentSubdomainData,
    EditComponentContactData,
    EditComponentLabelData,
    PagedResult,
} from '@domaindocs/types';

import { apiClient } from './api-client';
import { queryClient } from '../query-client';

export const componentsApi = (() => {
    const searchComponents = async (
        domainId: string,
        params: SearchComponentsParams,
    ): Promise<PagedResult<SearchComponent>> => {
        const result = await apiClient.get<PagedResult<SearchComponent>>(`/domains/${domainId}/components`, {
            params,
        });

        return result.data;
    };

    const getComponent = async (domainId: string, componentId: string): Promise<DetailedComponent> => {
        const result = await apiClient.get<DetailedComponent>(`/domains/${domainId}/components/${componentId}`);
        return result.data;
    };

    const createComponent = async (domainId: string, data: CreateComponentData): Promise<void> => {
        await apiClient.post(`/domains/${domainId}/components`, data);
    };

    const updateDescription = async (
        domainId: string,
        componentId: string,
        data: EditComponentDescriptionData,
    ): Promise<void> => {
        const result = await apiClient.post<DetailedComponent>(
            `/domains/${domainId}/components/${componentId}/description`,
            data,
        );

        updateLocalComponent(domainId, componentId, result.data);
    };

    const updateOwnership = async (
        domainId: string,
        componentId: string,
        data: EditComponentOwnershipData,
    ): Promise<void> => {
        const result = await apiClient.post<DetailedComponent>(
            `/domains/${domainId}/components/${componentId}/ownership`,
            data,
        );
        updateLocalComponent(domainId, componentId, result.data);
    };

    const removeOwnership = async (domainId: string, componentId: string): Promise<void> => {
        const result = await apiClient.delete<DetailedComponent>(
            `/domains/${domainId}/components/${componentId}/ownership`,
        );
        updateLocalComponent(domainId, componentId, result.data);
    };

    const updateSubdomain = async (
        domainId: string,
        componentId: string,
        data: EditComponentSubdomainData,
    ): Promise<void> => {
        const result = await apiClient.post<DetailedComponent>(
            `/domains/${domainId}/components/${componentId}/subdomain`,
            data,
        );
        updateLocalComponent(domainId, componentId, result.data);
    };

    const removeSubdomain = async (domainId: string, componentId: string): Promise<void> => {
        const result = await apiClient.delete<DetailedComponent>(
            `/domains/${domainId}/components/${componentId}/subdomain`,
        );
        updateLocalComponent(domainId, componentId, result.data);
    };

    const createLink = async (domainId: string, componentId: string, data: EditComponentLinkData): Promise<void> => {
        const result = await apiClient.post<DetailedComponent>(
            `/domains/${domainId}/components/${componentId}/links`,
            data,
        );
        updateLocalComponent(domainId, componentId, result.data);
    };

    const updateLink = async (
        domainId: string,
        componentId: string,
        linkId: string,
        data: EditComponentLinkData,
    ): Promise<void> => {
        const result = await apiClient.post<DetailedComponent>(
            `/domains/${domainId}/components/${componentId}/links/${linkId}`,
            data,
        );
        updateLocalComponent(domainId, componentId, result.data);
    };

    const removeLink = async (domainId: string, componentId: string, linkId: string): Promise<void> => {
        const result = await apiClient.delete<DetailedComponent>(
            `/domains/${domainId}/components/${componentId}/links/${linkId}`,
        );
        updateLocalComponent(domainId, componentId, result.data);
    };

    const createContact = async (
        domainId: string,
        componentId: string,
        data: EditComponentContactData,
    ): Promise<void> => {
        const result = await apiClient.post<DetailedComponent>(
            `/domains/${domainId}/components/${componentId}/contacts`,
            data,
        );
        updateLocalComponent(domainId, componentId, result.data);
    };

    const updateContact = async (
        domainId: string,
        componentId: string,
        contactId: string,
        data: EditComponentContactData,
    ): Promise<void> => {
        const result = await apiClient.post<DetailedComponent>(
            `/domains/${domainId}/components/${componentId}/contacts/${contactId}`,
            data,
        );
        updateLocalComponent(domainId, componentId, result.data);
    };

    const removeContact = async (domainId: string, componentId: string, contactId: string): Promise<void> => {
        const result = await apiClient.delete<DetailedComponent>(
            `/domains/${domainId}/components/${componentId}/contacts/${contactId}`,
        );
        updateLocalComponent(domainId, componentId, result.data);
    };

    const addLabel = async (domainId: string, componentId: string, data: EditComponentLabelData): Promise<void> => {
        const result = await apiClient.post<DetailedComponent>(
            `/domains/${domainId}/components/${componentId}/labels`,
            data,
        );
        updateLocalComponent(domainId, componentId, result.data);
    };

    const removeLabel = async (domainId: string, componentId: string, labelId: string): Promise<void> => {
        const result = await apiClient.delete<DetailedComponent>(
            `/domains/${domainId}/components/${componentId}/labels/${labelId}`,
        );
        updateLocalComponent(domainId, componentId, result.data);
    };

    const updateLocalComponent = (domainId: string, componentId: string, component: DetailedComponent) => {
        queryClient.setQueryData(['getComponent', { domainId, componentId }], component);
    };

    return {
        searchComponents,
        createComponent,
        getComponent,
        updateDescription,
        updateOwnership,
        removeOwnership,
        updateSubdomain,
        removeSubdomain,
        createLink,
        updateLink,
        removeLink,
        createContact,
        updateContact,
        removeContact,
        addLabel,
        removeLabel,
    };
})();
