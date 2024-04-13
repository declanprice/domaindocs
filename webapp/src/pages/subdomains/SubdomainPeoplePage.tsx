import { Flex, Stack } from '@chakra-ui/react'
import { TableToolbar } from '@components/table/TableToolbar.tsx'
import { Table } from '@components/table/Table.tsx'
import { useParams } from 'react-router-dom'
import { SubdomainPageParams } from './types/SubdomainPageParams.ts'
import { useQuery } from '@tanstack/react-query'
import { peopleApi, Person } from '@state/api/people-api.ts'
import { LoadingContainer } from '@components/loading/LoadingContainer.tsx'

export const SubdomainPeoplePage = () => {
    const { domainId, subdomainId } = useParams() as SubdomainPageParams

    const {
        data: people,
        isLoading,
        refetch,
    } = useQuery<Person[]>({
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

                <Table
                    data={people}
                    fields={[
                        {
                            label: 'Person',
                            name: 'name',
                            render: (data: Person) =>
                                `${data.firstName} ${data.lastName}`,
                            onClick: (row) => {
                                console.log('clicked row', row)
                            },
                        },
                        {
                            label: 'Subdomains',
                            name: 'subdomains',
                            render: (data: Person) => `Supporting`,
                            onClick: (row) => {
                                console.log('clicked row', row)
                            },
                        },
                        {
                            label: 'Teams',
                            name: 'teams',
                            render: (data: Person) =>
                                `Team Orion | Team Keplar`,
                            onClick: (row) => {
                                console.log('clicked row', row)
                            },
                        },
                        {
                            label: 'Skills',
                            name: 'skills',
                            render: (data: Person) =>
                                `Javascript | Node.js | AWS`,
                            onClick: (row) => {
                                console.log('clicked row', row)
                            },
                        },
                    ]}
                />
            </Stack>
        </Flex>
    )
}
