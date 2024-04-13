import { Flex, Stack } from '@chakra-ui/react'
import { TableToolbar } from '@components/table/TableToolbar.tsx'
import { Table } from '@components/table/Table.tsx'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { peopleApi, Person } from '@state/api/people-api.ts'
import { LoadingContainer } from '@components/loading/LoadingContainer.tsx'
import { PeopleTable } from '@components/table/people/PeopleTable.tsx'

type PeoplePageParams = {
    domainId: string
}

export const PeoplePage = () => {
    const { domainId } = useParams() as PeoplePageParams

    const {
        data: people,
        isLoading,
        refetch,
    } = useQuery<Person[]>({
        queryKey: ['searchPeople', { domainId }],
        queryFn: () => peopleApi.searchPeople(domainId, {}),
    })

    if (!people || isLoading) return <LoadingContainer />

    return (
        <Flex p={4} gap={4} width={'100%'} direction={'column'}>
            <Stack>
                <TableToolbar
                    title={'People (3)'}
                    onSearch={() => {}}
                    onFilterClick={() => {}}
                />

                <PeopleTable people={people} />
            </Stack>
        </Flex>
    )
}
