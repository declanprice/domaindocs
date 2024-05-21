import { apiClient } from './api-client';
import {
    UpdateTeamMembersData,
    CreateTeamData,
    DetailedTeam,
    SearchTeamParams,
    UpdateTeamSummaryData,
} from '@domaindocs/lib';

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

    const updateSummary = async (domainId: string, teamId: string, data: UpdateTeamSummaryData): Promise<void> => {
        await apiClient.post(`/domains/${domainId}/teams/${teamId}/summary`, data);
    };

    const updateMembers = async (domainId: string, teamId: string, data: UpdateTeamMembersData): Promise<void> => {
        await apiClient.post(`/domains/${domainId}/teams/${teamId}/members`, data);
    };

    const getTeam = async (domainId: string, teamId: string): Promise<DetailedTeam> => {
        const result = await apiClient.get<DetailedTeam>(`/domains/${domainId}/teams/${teamId}`);

        return result.data;
    };

    return {
        searchTeams,
        createTeam,
        updateSummary,
        updateMembers,
        getTeam,
    };
})();
