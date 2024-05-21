import { apiClient } from './api-client';
import {
    DetailedPerson,
    SearchPeopleParams,
    UpdatePersonRolesData,
    UpdatePersonSkillsData,
    UpdatePersonContactDetailsData,
} from '@domaindocs/lib';

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

    const updateSkills = async (domainId: string, userId: string, data: UpdatePersonSkillsData): Promise<void> => {
        await apiClient.put<void>(`/domains/${domainId}/people/${userId}/skills`, data);
    };

    const updateRoles = async (domainId: string, userId: string, data: UpdatePersonRolesData): Promise<void> => {
        await apiClient.put<void>(`/domains/${domainId}/people/${userId}/roles`, data);
    };

    const updateContactDetails = async (
        domainId: string,
        userId: string,
        data: UpdatePersonContactDetailsData,
    ): Promise<void> => {
        await apiClient.put<void>(`/domains/${domainId}/people/${userId}/contact`, data);
    };

    return {
        search,
        get,
        updateSkills,
        updateRoles,
        updateContactDetails,
    };
})();
