import { apiClient } from './api-client';
import { DetailedPersonDto, SearchPeopleDto } from '@domaindocs/lib';
import { plainToInstance } from 'class-transformer';

export const peopleApi = (() => {
  const searchPeople = async (
    domainId: string,
    data: SearchPeopleDto,
  ): Promise<DetailedPersonDto[]> => {
    const result = await apiClient.get<DetailedPersonDto[]>(
      `/domains/${domainId}/people`,
      {
        params: data,
      },
    );

    return result.data.map((d) => plainToInstance(DetailedPersonDto, d));
  };

  return {
    searchPeople,
  };
})();
