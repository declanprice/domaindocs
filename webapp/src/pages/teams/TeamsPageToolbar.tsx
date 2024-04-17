import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import { TbUsersGroup } from 'react-icons/tb';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { DomainPageParams } from '../../types/DomainPageParams';
import { subdomainsApi } from '../../state/api/subdomains-api';
import { teamsApi } from '../../state/api/teams-api';
import { queryClient } from '../../state/query-client';
import { CreateTeamDialog } from '../../components/team/CreateTeamDialog';
import { PageToolbar } from '../../components/page/PageToolbar';
import { CreateTeamDto, SubdomainDto } from '@domaindocs/lib';

export const TeamsPageToolbar = () => {
  const { domainId } = useParams() as DomainPageParams;

  const createTeamDialog = useDisclosure();

  const { data: subdomains } = useQuery<SubdomainDto[]>({
    queryKey: ['searchSubdomains', { domainId }],
    queryFn: () => subdomainsApi.searchSubdomains(domainId),
  });

  const { mutateAsync: createTeam } = useMutation({
    mutationKey: ['createTeam', { domainId }],
    mutationFn: async (data: CreateTeamDto) => {
      await teamsApi.createTeam(domainId, data);

      await queryClient.invalidateQueries({
        queryKey: ['searchTeams', { domainId }],
      });
    },
  });

  return (
    <>
      <PageToolbar
        title={
          <Flex alignItems={'center'}>
            <TbUsersGroup color={'gray.900'} size={14} />
            <Text ml={2} fontSize={12}>
              Teams
            </Text>
          </Flex>
        }
        actions={[
          {
            label: 'New Team',
            onClick: createTeamDialog.onOpen,
          },
        ]}
      />

      <CreateTeamDialog
        isOpen={createTeamDialog.isOpen}
        onClose={createTeamDialog.onClose}
        subdomains={subdomains || []}
        onCreateTeam={async (team) => {
          await createTeam(team);
        }}
      />
    </>
  );
};
