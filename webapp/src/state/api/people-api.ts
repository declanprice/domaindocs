import { apiClient } from './api-client';

import {
    DetailedPerson,
    SearchPeopleParams,
    EditPersonRoleData,
    EditPersonSkillData,
    EditPersonContactData,
} from '@domaindocs/types';

import { queryClient } from '../query-client';

export const peopleApi = (() => {
    const search = async (domainId: string, data: SearchPeopleParams): Promise<DetailedPerson[]> => {
        const result = await apiClient.get<DetailedPerson[]>(`/domains/${domainId}/people`, {
            params: data,
        });

        return result.data;
    };

    const get = async (domainId: string, userId: string): Promise<DetailedPerson> => {
        const result = await apiClient.get<DetailedPerson>(`/domains/${domainId}/people/${userId}`);
        return result.data;
    };

    const createSkill = async (domainId: string, userId: string, data: EditPersonSkillData): Promise<void> => {
        const result = await apiClient.post<DetailedPerson>(`/domains/${domainId}/people/${userId}/skills`, data);
        updateLocalPerson(domainId, userId, result.data);
    };

    const deleteSkill = async (domainId: string, userId: string, skillId: string): Promise<void> => {
        const result = await apiClient.delete<DetailedPerson>(
            `/domains/${domainId}/people/${userId}/skills/${skillId}`,
        );
        updateLocalPerson(domainId, userId, result.data);
    };

    const createRole = async (domainId: string, userId: string, data: EditPersonRoleData): Promise<void> => {
        const result = await apiClient.post<DetailedPerson>(`/domains/${domainId}/people/${userId}/roles`, data);
        updateLocalPerson(domainId, userId, result.data);
    };

    const updateRole = async (
        domainId: string,
        userId: string,
        roleId: string,
        data: EditPersonRoleData,
    ): Promise<void> => {
        const result = await apiClient.post<DetailedPerson>(
            `/domains/${domainId}/people/${userId}/roles/${roleId}`,
            data,
        );
        updateLocalPerson(domainId, userId, result.data);
    };

    const deleteRole = async (domainId: string, userId: string, roleId: string): Promise<void> => {
        const result = await apiClient.delete<DetailedPerson>(`/domains/${domainId}/people/${userId}/roles/${roleId}`);
        updateLocalPerson(domainId, userId, result.data);
    };

    const createContact = async (domainId: string, userId: string, data: EditPersonContactData): Promise<void> => {
        const result = await apiClient.post<DetailedPerson>(`/domains/${domainId}/people/${userId}/contacts`, data);
        updateLocalPerson(domainId, userId, result.data);
    };

    const updateContact = async (
        domainId: string,
        userId: string,
        contactId: string,
        data: EditPersonContactData,
    ): Promise<void> => {
        const result = await apiClient.post<DetailedPerson>(
            `/domains/${domainId}/people/${userId}/contacts/${contactId}`,
            data,
        );
        updateLocalPerson(domainId, userId, result.data);
    };

    const deleteContact = async (domainId: string, userId: string, contactId: string): Promise<void> => {
        const result = await apiClient.delete<DetailedPerson>(
            `/domains/${domainId}/people/${userId}/contacts/${contactId}`,
        );
        updateLocalPerson(domainId, userId, result.data);
    };

    const updateLocalPerson = (domainId: string, userId: string, person: DetailedPerson) => {
        queryClient.setQueryData(['getPerson', { domainId, userId }], person);
    };

    return {
        search,
        get,
        createSkill,
        deleteSkill,
        createRole,
        updateRole,
        deleteRole,
        createContact,
        updateContact,
        deleteContact,
    };
})();
