import { Person } from '@state/api/people-api.ts'
import { Table } from '@components/table/Table.tsx'
import { Badge } from '@chakra-ui/react'

type PeopleTableProps = {
    people: Person[]
}

export const PeopleTable = (props: PeopleTableProps) => {
    const { people } = props

    return (
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
                    render: (data: Person) => {
                        if (data.subdomains.length) {
                            return `${data.subdomains.map((s) => s.subdomainName).join(' | ')}`
                        } else {
                            return (
                                <Badge size={'xs'} colorScheme={'yellow'}>
                                    Not Set
                                </Badge>
                            )
                        }
                    },
                    onClick: (row) => {
                        console.log('clicked row', row)
                    },
                },
                {
                    label: 'Teams',
                    name: 'teams',
                    render: (data: Person) => {
                        if (data.teams.length) {
                            return `${data.teams.map((t) => t.teamName).join(' | ')}`
                        } else {
                            return (
                                <Badge size={'xs'} colorScheme={'blue'}>
                                    Not Set
                                </Badge>
                            )
                        }
                    },
                    onClick: (row) => {
                        console.log('clicked row', row)
                    },
                },
                {
                    label: 'Skills',
                    name: 'skills',
                    render: (data: Person) => {
                        if (data.skills.length) {
                            return `${data.skills.join(' | ')}`
                        } else {
                            return (
                                <Badge size={'xs'} colorScheme={'gray'}>
                                    Not Set
                                </Badge>
                            )
                        }
                    },
                    onClick: (row) => {
                        console.log('clicked row', row)
                    },
                },
            ]}
        />
    )
}
