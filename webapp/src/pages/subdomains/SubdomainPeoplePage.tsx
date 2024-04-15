import { Flex, Stack } from '@chakra-ui/react'
import { TableToolbar } from '@components/table/TableToolbar.tsx'
import { useParams } from 'react-router-dom'
import { SubdomainPageParams } from './types/SubdomainPageParams.ts'
import { useQuery } from '@tanstack/react-query'
import { DetailedPerson, peopleApi } from '@state/api/people-api.ts'
import { LoadingContainer } from '@components/loading/LoadingContainer.tsx'
import { PersonTable } from '@components/person/PersonTable.tsx'

export const SubdomainPeoplePage = () => {
    const { domainId, subdomainId } = useParams() as SubdomainPageParams

    const { data: people, isLoading } = useQuery<DetailedPerson[]>({
        queryKey: ['subdomainPeople', { domainId, subdomainId }],
        queryFn: () => peopleApi.searchPeople(domainId, { subdomainId }),
    })

    if (!people || isLoading) return <LoadingContainer />

    return (
        <Flex p={4} gap={4} width={'100%'} direction={'column'}>
            <Stack>
                <TableToolbar
                    title={'Supporting People (3)'}
                    onSearch={() => {}}
                    onFilterClick={() => {}}
                />

                <PersonTable people={people} onPersonClick={() => {}} />
            </Stack>
        </Flex>
    )
}
