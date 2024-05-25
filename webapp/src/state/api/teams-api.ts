import { apiClient } from './api-client';
import {
    UpdateTeamMembersData,
    CreateTeamData,
    DetailedTeam,
    SearchTeamParams,
    UpdateTeamSummaryData,
} from '@domaindocs/types';

export const teamsApi = (() => {
    const search = async (domainId: string, dto: SearchTeamParams = {}): Promise<DetailedTeam[]> => {
        const result = await apiClient.get<DetailedTeam[]>(`/domains/${domainId}/teams`, {
            params: dto,
        });

        return result.data;
    };

    const create = async (domainId: string, dto: CreateTeamData): Promise<void> => {
        await apiClient.post(`/domains/${domainId}/teams`, dto);
    };

    const get = async (domainId: string, teamId: string): Promise<DetailedTeam> => {
        const result = await apiClient.get<DetailedTeam>(`/domains/${domainId}/teams/${teamId}`);

        return result.data;
    };

    const updateSummary = async (domainId: string, teamId: string, data: UpdateTeamSummaryData): Promise<void> => {
        await apiClient.post(`/domains/${domainId}/teams/${teamId}/summary`, data);
    };

    const updateMembers = async (domainId: string, teamId: string, data: UpdateTeamMembersData): Promise<void> => {
        await apiClient.post(`/domains/${domainId}/teams/${teamId}/members`, data);
    };

    return {
        search,
        create,
        get,
        updateSummary,
        updateMembers,
    };
})();
