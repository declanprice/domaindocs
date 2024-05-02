import { Box, Flex, Stack, useDisclosure } from '@chakra-ui/react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { teamsApi } from '../../state/api/teams-api';
import { DomainPageParams } from '../../types/DomainPageParams';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { TableToolbar } from '../../components/table/TableToolbar';
import { TeamTable } from '../../components/team/TeamTable';
import { TeamSidebar } from '../../components/team/TeamSidebar';
import { DetailedTeam } from '@domaindocs/lib';
import { TeamsPageToolbar } from './TeamsPageToolbar';

export const TeamsPage = () => {
    const { domainId } = useParams() as DomainPageParams;

    const navigate = useNavigate();

    const teamSideBar = useDisclosure();

    const [selectedTeam, setSelectedTeam] = useState<DetailedTeam | null>(null);

    const { data: teams, isLoading } = useQuery<DetailedTeam[]>({
        queryKey: ['searchTeams', { domainId }],
        queryFn: () => teamsApi.searchTeams(domainId, {}),
    });

    if (!teams || isLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" width={'100%'}>
            <TeamsPageToolbar />

            <Box height={'100%'} width={'100%'} overflowY={'auto'}>
                <Flex p={4} gap={4} width={'100%'} direction={'column'}>
                    <Stack>
                        <TableToolbar title={`Teams (${teams.length})`} onSearch={() => {}} onFilterClick={() => {}} />

                        <TeamTable
                            teams={teams}
                            onTeamClick={(team) => {
                                navigate(`/${domainId}/teams/${team.team.teamId}`);
                                // setSelectedTeam(team);
                                // teamSideBar.onOpen();
                            }}
                        />

                        <TeamSidebar
                            isOpen={teamSideBar.isOpen}
                            onClose={() => {
                                setSelectedTeam(null);
                                teamSideBar.onClose();
                            }}
                            team={selectedTeam!}
                        />
                    </Stack>
                </Flex>
            </Box>
        </Flex>
    );
};
