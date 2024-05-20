import { apiClient } from './api-client';
import { SearchSkillsParams, Skill } from '@domaindocs/lib';

export const skillsApi = (() => {
    const search = async (domainId: string, params: SearchSkillsParams): Promise<Skill[]> => {
        const result = await apiClient.get<Skill[]>(`/domains/${domainId}/skills`, { params });
        return result.data;
    };

    return {
        search,
    };
})();
