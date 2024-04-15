import { PageToolbar } from '@components/page/PageToolbar.tsx'
import { Flex, Text, useDisclosure } from '@chakra-ui/react'
import { TbUsersGroup } from 'react-icons/tb'
import { CreateTeamDialog } from '@components/team/CreateTeamDialog.tsx'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Subdomain, subdomainsApi } from '@state/api/subdomains-api.ts'
import { useParams } from 'react-router-dom'
import { CreateTeamData, teamsApi } from '@state/api/teams-api.ts'
import { queryClient } from '@state/query-client.ts'
import { DomainPageParams } from '@types/DomainPageParams.ts'

export const TeamsPageToolbar = () => {
    const { domainId } = useParams() as DomainPageParams

    const createTeamDialog = useDisclosure()

    const { data: subdomains } = useQuery<Subdomain[]>({
        queryKey: ['searchSubdomains', { domainId }],
        queryFn: () => subdomainsApi.searchSubdomains(domainId),
    })

    const { mutateAsync: createTeam } = useMutation({
        mutationKey: ['createTeam', { domainId }],
        mutationFn: async (data: CreateTeamData) => {
            await teamsApi.createTeam(domainId, data)

            await queryClient.invalidateQueries({
                queryKey: ['searchTeams', { domainId }],
            })
        },
    })

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
                    await createTeam(team)
                }}
            />
        </>
    )
}
