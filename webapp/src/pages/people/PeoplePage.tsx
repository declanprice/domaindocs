import { Flex, Stack } from '@chakra-ui/react'
import { TableToolbar } from '@components/table/TableToolbar.tsx'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { peopleApi, Person } from '@state/api/people-api.ts'
import { LoadingContainer } from '@components/loading/LoadingContainer.tsx'
import { PersonTable } from '@components/person/PersonTable.tsx'

type PeoplePageParams = {
    domainId: string
}

export const PeoplePage = () => {
    const { domainId } = useParams() as PeoplePageParams

    const { data: people, isLoading } = useQuery<Person[]>({
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

                <PersonTable people={people} />
            </Stack>
        </Flex>
    )
}
