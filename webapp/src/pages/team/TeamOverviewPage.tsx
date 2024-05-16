import { Divider, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { DetailedTeam } from '@domaindocs/lib';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { teamsApi } from '../../state/api/teams-api';
import { TeamPageToolbar } from './TeamPageToolbar';
import { TeamPageParams } from './TeamPageParams';
import { TeamSummary } from './components/TeamSummary';
import { TeamMembersList } from './components/TeamMembersList';
import { TeamProjectsList } from './components/TeamProjectsList';
import { TeamAvatar } from '../../components/team/TeamAvatar';

export const TeamOverviewPage = () => {
    const { domainId, teamId } = useParams() as TeamPageParams;

    const { data: team, isLoading } = useQuery<DetailedTeam>({
        queryKey: ['getTeam', { domainId, teamId }],
        queryFn: () => teamsApi.getTeam(domainId, teamId),
    });

    if (!team || isLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" width={'100%'}>
            <TeamPageToolbar teamName={team.team.name} domainId={domainId} teamId={teamId} />

            <Flex direction="column" width={'100%'} overflowY={'auto'} gap={2} p={8}>
                <TeamAvatar team={team.team} />

                <TeamSummary team={team.team} />

                <Divider />

                <TeamMembersList members={team.members} />

                <Divider />

                <TeamProjectsList projects={team.projects} />
            </Flex>
        </Flex>
    );
};
