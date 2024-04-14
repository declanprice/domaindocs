import { Person } from '@state/api/people-api.ts'
import { Table } from '@components/table/Table.tsx'
import { Badge } from '@chakra-ui/react'

type PeopleTableProps = {
    people: Person[]
}

export const PersonTable = (props: PeopleTableProps) => {
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
                    label: 'Subdomain',
                    name: 'teams',
                    render: (data: Person) => {
                        if (data.team) {
                            return `${data.team.subdomainName}`
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
                        if (data.team) {
                            return `${data.team.teamName}`
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
