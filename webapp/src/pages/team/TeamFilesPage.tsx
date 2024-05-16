import { useParams } from 'react-router-dom';
import { TeamPageParams } from './TeamPageParams';
import { useQuery } from '@tanstack/react-query';
import { DetailedTeam } from '@domaindocs/lib';
import { teamsApi } from '../../state/api/teams-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { Box, Flex } from '@chakra-ui/react';
import { TeamPageToolbar } from './TeamPageToolbar';

export const TeamFilesPage = () => {
    const { domainId, teamId } = useParams() as TeamPageParams;

    const { data: team, isLoading } = useQuery<DetailedTeam>({
        queryKey: ['getTeam', { domainId, teamId }],
        queryFn: () => teamsApi.getTeam(domainId, teamId),
    });

    if (!team || isLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" width={'100%'}>
            <TeamPageToolbar teamName={team.team.name} domainId={domainId} teamId={teamId} />

            <Box height={'100%'} width={'100%'} overflowY={'auto'}>
                <Flex p={4} gap={4} width={'100%'} direction={'column'}>
                    files
                </Flex>
            </Box>
        </Flex>
    );
};
