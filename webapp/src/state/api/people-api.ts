import { apiClient } from './api-client';
import { DetailedPersonDto, SearchPeopleParams } from '@domaindocs/lib';

export const peopleApi = (() => {
    const searchPeople = async (domainId: string, data: SearchPeopleParams): Promise<DetailedPersonDto[]> => {
        const result = await apiClient.get<DetailedPersonDto[]>(`/domains/${domainId}/people`, {
            params: data,
        });

        return result.data;
    };

    return {
        searchPeople,
    };
})();
