import { Flex, Stack } from '@chakra-ui/react'
import { TableToolbar } from '@components/table/TableToolbar.tsx'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { LoadingContainer } from '@components/loading/LoadingContainer.tsx'
import { Team, teamsApi } from '@state/api/teams-api.ts'
import { TeamTable } from '@components/table/team/TeamsTable.tsx'

type TeamPageParam = {
    domainId: string
}

export const TeamsPage = () => {
    const { domainId } = useParams() as TeamPageParam

    const { data: teams, isLoading } = useQuery<Team[]>({
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

                <TeamTable teams={teams} />
            </Stack>
        </Flex>
    )
}
