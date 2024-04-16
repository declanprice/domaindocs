import { apiClient } from './api-client';
import { CreateTeamDto, DetailedTeamDto, SearchTeamDto } from '@domaindocs/lib';

export const teamsApi = (() => {
  const searchTeams = async (
    domainId: string,
    dto: SearchTeamDto = {},
  ): Promise<DetailedTeamDto[]> => {
    const result = await apiClient.get<DetailedTeamDto[]>(
      `/domains/${domainId}/teams`,
      {
        params: dto,
      },
    );

    return result.data;
  };

  const createTeam = async (
    domainId: string,
    dto: CreateTeamDto,
  ): Promise<void> => {
    await apiClient.post(`/domains/${domainId}/teams`, dto);
  };

  return {
    searchTeams,
    createTeam,
  };
})();
