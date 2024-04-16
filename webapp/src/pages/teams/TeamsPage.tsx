import { Flex, Stack, useDisclosure } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { DetailedTeam, teamsApi } from '../../state/api/teams-api';
import { DomainPageParams } from '../../types/DomainPageParams';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { TableToolbar } from '../../components/table/TableToolbar';
import { TeamTable } from '../../components/team/TeamTable';
import { TeamSidebar } from '../../components/team/TeamSidebar';

export const TeamsPage = () => {
  const { domainId } = useParams() as DomainPageParams;

  const teamSideBar = useDisclosure();

  const [selectedTeam, setSelectedTeam] = useState<DetailedTeam | null>(null);

  const { data: teams, isLoading } = useQuery<DetailedTeam[]>({
    queryKey: ['searchTeams', { domainId }],
    queryFn: () => teamsApi.searchTeams(domainId, {}),
  });

  if (!teams || isLoading) return <LoadingContainer />;

  return (
    <Flex p={4} gap={4} width={'100%'} direction={'column'}>
      <Stack>
        <TableToolbar
          title={`Teams (${teams.length})`}
          onSearch={() => {}}
          onFilterClick={() => {}}
        />

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
  );
};
