import { apiClient } from './api-client';
import {
    AddTeamMemberData,
    CreateTeamData,
    DetailedTeam,
    SearchTeamParams,
    EditTeamDescriptionData,
    EditLinkData,
    EditContactData,
} from '@domaindocs/types';
import { queryClient } from '../query-client';

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

    const remove = async (domainId: string, teamId: string): Promise<void> => {
        await apiClient.delete(`/domains/${domainId}/teams/${teamId}`);
    };

    const get = async (domainId: string, teamId: string): Promise<DetailedTeam> => {
        const result = await apiClient.get<DetailedTeam>(`/domains/${domainId}/teams/${teamId}`);

        return result.data;
    };

    const updateDescription = async (
        domainId: string,
        teamId: string,
        data: EditTeamDescriptionData,
    ): Promise<void> => {
        const result = await apiClient.post<DetailedTeam>(`/domains/${domainId}/teams/${teamId}/description`, data);
        updateLocalTeam(domainId, teamId, result.data);
    };

    const addMember = async (domainId: string, teamId: string, data: AddTeamMemberData): Promise<void> => {
        const result = await apiClient.post<DetailedTeam>(`/domains/${domainId}/teams/${teamId}/members`, data);
        updateLocalTeam(domainId, teamId, result.data);
    };

    const removeMember = async (domainId: string, teamId: string, userId: string): Promise<void> => {
        const result = await apiClient.delete<DetailedTeam>(`/domains/${domainId}/teams/${teamId}/members/${userId}`);
        updateLocalTeam(domainId, teamId, result.data);
    };

    const createContact = async (domainId: string, teamId: string, data: EditContactData): Promise<void> => {
        const result = await apiClient.post<DetailedTeam>(`/domains/${domainId}/teams/${teamId}/contacts`, data);
        updateLocalTeam(domainId, teamId, result.data);
    };

    const updateContact = async (
        domainId: string,
        teamId: string,
        contactId: string,
        data: EditContactData,
    ): Promise<void> => {
        const result = await apiClient.post<DetailedTeam>(
            `/domains/${domainId}/teams/${teamId}/contacts/${contactId}`,
            data,
        );
        updateLocalTeam(domainId, teamId, result.data);
    };

    const deleteContact = async (domainId: string, teamId: string, contactId: string): Promise<void> => {
        const result = await apiClient.delete<DetailedTeam>(
            `/domains/${domainId}/teams/${teamId}/contacts/${contactId}`,
        );
        updateLocalTeam(domainId, teamId, result.data);
    };

    const createLink = async (domainId: string, teamId: string, data: EditLinkData): Promise<void> => {
        const result = await apiClient.post<DetailedTeam>(`/domains/${domainId}/teams/${teamId}/links`, data);
        updateLocalTeam(domainId, teamId, result.data);
    };

    const updateLink = async (domainId: string, teamId: string, linkId: string, data: EditLinkData): Promise<void> => {
        const result = await apiClient.post<DetailedTeam>(`/domains/${domainId}/teams/${teamId}/links/${linkId}`, data);
        updateLocalTeam(domainId, teamId, result.data);
    };

    const deleteLink = async (domainId: string, teamId: string, linkId: string): Promise<void> => {
        const result = await apiClient.delete<DetailedTeam>(`/domains/${domainId}/teams/${teamId}/links/${linkId}`);
        updateLocalTeam(domainId, teamId, result.data);
    };

    const updateLocalTeam = (domainId: string, teamId: string, team: DetailedTeam) => {
        queryClient.setQueryData(['getTeam', { domainId, teamId }], team);
    };

    return {
        search,
        create,
        remove,
        get,
        updateDescription,
        addMember,
        removeMember,
        createContact,
        updateContact,
        deleteContact,
        createLink,
        updateLink,
        deleteLink,
    };
})();
