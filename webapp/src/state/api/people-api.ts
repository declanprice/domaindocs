import { apiClient } from './api-client';
import { DetailedPerson, SearchPeopleParams } from '@domaindocs/lib';

export const peopleApi = (() => {
    const searchPeople = async (domainId: string, data: SearchPeopleParams): Promise<DetailedPerson[]> => {
        const result = await apiClient.get<DetailedPerson[]>(`/domains/${domainId}/people`, {
            params: data,
        });

        return result.data;
    };

    return {
        searchPeople,
    };
})();
