import { Box, Flex, Stack, useDisclosure } from '@chakra-ui/react';
import { SubdomainPageToolbar } from './SubdomainPageToolbar';
import { useParams } from 'react-router-dom';
import { TableToolbar } from '../../components/table/TableToolbar';
import { TeamTable } from '../../components/team/TeamTable';
import { TeamSidebar } from '../../components/team/TeamSidebar';
import { useQuery } from '@tanstack/react-query';
import { DetailedTeamDto } from '@domaindocs/lib';
import { teamsApi } from '../../state/api/teams-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { SubdomainPageParams } from './SubdomainPageParams';
import { useState } from 'react';

export const SubdomainTeamsPage = () => {
    const { domainId, subdomainId } = useParams() as SubdomainPageParams;

    const teamSideBar = useDisclosure();

    const [selectedTeam, setSelectedTeam] = useState<DetailedTeamDto | null>(null);

    const { data: teams, isLoading } = useQuery<DetailedTeamDto[]>({
        queryKey: ['searchTeams', { domainId, subdomainId }],
        queryFn: () => teamsApi.searchTeams(domainId, { subdomainId }),
    });

    if (!teams || isLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" width={'100%'}>
            <SubdomainPageToolbar />

            <Box height={'100%'} width={'100%'} overflowY={'auto'}>
                <Flex p={4} gap={4} width={'100%'} direction={'column'}>
                    <Stack>
                        <TableToolbar title={`Teams (${teams.length})`} onSearch={() => {}} onFilterClick={() => {}} />

                        <TeamTable
                            teams={teams}
                            onTeamClick={(team) => {
                                setSelectedTeam(team);
                                teamSideBar.onOpen();
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
