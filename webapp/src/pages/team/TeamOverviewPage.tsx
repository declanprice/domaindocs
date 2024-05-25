import { Divider, Flex, Heading, Stack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { DetailedTeam } from '@domaindocs/types';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { teamsApi } from '../../state/api/teams-api';
import { TeamPageToolbar } from './TeamPageToolbar';
import { TeamPageParams } from './TeamPageParams';
import { TeamSummary } from './components/TeamSummary';
import { TeamMembersList } from './components/TeamMembersList';
import { TeamProjectsList } from './components/TeamProjectsList';
import { TeamAvatar } from '../../components/team/TeamAvatar';
import React from 'react';
import { useEditable } from '../../hooks/useEditable';
import { TeamSummaryEdit } from './components/TeamSummaryEdit';
import { TeamMembersListEdit } from './components/TeamMembersListEdit';

export const TeamOverviewPage = () => {
    const { domainId, teamId } = useParams() as TeamPageParams;

    const {
        data: team,
        isLoading,
        refetch,
    } = useQuery<DetailedTeam>({
        queryKey: ['getTeam', { domainId, teamId }],
        queryFn: () => teamsApi.get(domainId, teamId),
    });

    const editSummary = useEditable();
    const editMembers = useEditable();

    if (!team || isLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" width={'100%'}>
            <TeamPageToolbar teamName={team.team.name} domainId={domainId} teamId={teamId} />

            <Flex direction="column" width={'100%'} overflowY={'auto'} gap={6} p={8}>
                <Stack spacing={4}>
                    <TeamAvatar name={team.team.name} iconUri={team.team.iconUri} />

                    {editSummary.isEditing ? (
                        <TeamSummaryEdit
                            domainId={domainId}
                            team={team.team}
                            onSubmit={async () => {
                                await refetch();
                                editSummary.onClose();
                            }}
                            onCancel={editSummary.onClose}
                        />
                    ) : (
                        <TeamSummary team={team.team} onEdit={editSummary.onEdit} />
                    )}
                </Stack>

                <Divider />

                {editMembers.isEditing ? (
                    <TeamMembersListEdit
                        domainId={domainId}
                        teamId={team.team.teamId}
                        members={team.members}
                        onSubmit={async () => {
                            await refetch();
                            editMembers.onClose();
                        }}
                        onCancel={editMembers.onClose}
                    />
                ) : (
                    <TeamMembersList members={team.members} onEdit={editMembers.onEdit} />
                )}

                <Divider />

                <TeamProjectsList domainId={domainId} projects={team.projects} />
            </Flex>
        </Flex>
    );
};
