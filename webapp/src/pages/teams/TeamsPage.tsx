import { Box, Flex } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { teamsApi } from '../../state/api/teams-api';
import { DomainPageParams } from '../../types/DomainPageParams';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { TableToolbar } from '../../components/table/TableToolbar';
import { TeamsTable } from './components/TeamsTable';
import { DetailedTeam } from '@domaindocs/types';
import { TeamsPageToolbar } from './TeamsPageToolbar';

export const TeamsPage = () => {
    const { domainId } = useParams() as DomainPageParams;

    const navigate = useNavigate();

    const { data: teams, isLoading } = useQuery<DetailedTeam[]>({
        queryKey: ['searchTeams', { domainId }],
        queryFn: () => teamsApi.search(domainId, {}),
    });

    if (!teams || isLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" width={'100%'}>
            <TeamsPageToolbar />

            <Box height={'100%'} width={'100%'} overflowY={'auto'}>
                <Flex p={4} width={'100%'} direction={'column'}>
                    <TableToolbar title={`Teams (${teams.length})`} onSearch={() => {}} onFilterClick={() => {}} />

                    <TeamsTable
                        teams={teams}
                        onTeamClick={(team) => {
                            navigate(`/${domainId}/teams/${team.team.teamId}`);
                        }}
                        onProjectClick={(project) => {
                            navigate(`/${domainId}/projects/${project.projectId}`);
                        }}
                    />
                </Flex>
            </Box>
        </Flex>
    );
};
