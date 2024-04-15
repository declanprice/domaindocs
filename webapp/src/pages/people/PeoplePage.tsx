import { Flex, Stack, useDisclosure } from '@chakra-ui/react'
import { TableToolbar } from '@components/table/TableToolbar.tsx'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { DetailedPerson, peopleApi } from '@state/api/people-api.ts'
import { LoadingContainer } from '@components/loading/LoadingContainer.tsx'
import { PersonTable } from '@components/person/PersonTable.tsx'
import { useState } from 'react'
import { PersonSideBar } from '@components/person/PersonSideBar.tsx'

type PeoplePageParams = {
    domainId: string
}

export const PeoplePage = () => {
    const { domainId } = useParams() as PeoplePageParams

    const personSideBar = useDisclosure()

    const [selectedPerson, setSelectedPerson] = useState<DetailedPerson | null>(
        null
    )

    const { data: people, isLoading } = useQuery<DetailedPerson[]>({
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

                <PersonTable
                    people={people}
                    onPersonClick={(person) => {
                        setSelectedPerson(person)
                        personSideBar.onOpen()
                    }}
                />

                <PersonSideBar
                    isOpen={personSideBar.isOpen}
                    onClose={() => {
                        setSelectedPerson(null)
                        personSideBar.onClose()
                    }}
                    person={selectedPerson}
                />
            </Stack>
        </Flex>
    )
}
