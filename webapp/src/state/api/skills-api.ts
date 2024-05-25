import { apiClient } from './api-client';
import { CreateSkillData, SearchSkillsParams, Skill } from '@domaindocs/types';

export const skillsApi = (() => {
    const search = async (domainId: string, params: SearchSkillsParams): Promise<Skill[]> => {
        const result = await apiClient.get<Skill[]>(`/domains/${domainId}/skills`, { params });
        return result.data;
    };

    const create = async (domainId: string, data: CreateSkillData): Promise<Skill> => {
        const result = await apiClient.post<Skill>(`/domains/${domainId}/skills`, data);
        return result.data;
    };

    return {
        search,
        create,
    };
})();
