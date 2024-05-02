import { apiClient } from './api-client';
import { CreateTeamData, DetailedTeam, SearchTeamParams } from '@domaindocs/lib';

export const teamsApi = (() => {
    const searchTeams = async (domainId: string, dto: SearchTeamParams = {}): Promise<DetailedTeam[]> => {
        const result = await apiClient.get<DetailedTeam[]>(`/domains/${domainId}/teams`, {
            params: dto,
        });

        return result.data;
    };

    const createTeam = async (domainId: string, dto: CreateTeamData): Promise<void> => {
        await apiClient.post(`/domains/${domainId}/teams`, dto);
    };

    const getTeam = async (domainId: string, teamId: string): Promise<DetailedTeam> => {
        const result = await apiClient.get<DetailedTeam>(`/domains/${domainId}/teams/${teamId}`);

        return result.data;
    };

    return {
        searchTeams,
        createTeam,
        getTeam,
    };
})();
