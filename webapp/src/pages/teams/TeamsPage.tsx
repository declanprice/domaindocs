import { Flex, Stack, useDisclosure } from '@chakra-ui/react'
import { TableToolbar } from '@components/table/TableToolbar.tsx'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { LoadingContainer } from '@components/loading/LoadingContainer.tsx'
import { DetailedTeam, teamsApi } from '@state/api/teams-api.ts'
import { TeamTable } from '@components/team/TeamTable.tsx'
import { TeamSidebar } from '@components/team/TeamSidebar.tsx'
import { useState } from 'react'
import { DomainPageParams } from '@types/DomainPageParams.ts'

export const TeamsPage = () => {
    const { domainId } = useParams() as DomainPageParams

    const teamSideBar = useDisclosure()

    const [selectedTeam, setSelectedTeam] = useState<DetailedTeam | null>(null)

    const { data: teams, isLoading } = useQuery<DetailedTeam[]>({
        queryKey: ['searchTeams', { domainId }],
        queryFn: () => teamsApi.searchTeams(domainId, {}),
    })

    if (!teams || isLoading) return <LoadingContainer />

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
                        setSelectedTeam(team)
                        teamSideBar.onOpen()
                    }}
                />

                <TeamSidebar
                    isOpen={teamSideBar.isOpen}
                    onClose={() => {
                        setSelectedTeam(null)
                        teamSideBar.onClose()
                    }}
                    team={selectedTeam!}
                />
            </Stack>
        </Flex>
    )
}
