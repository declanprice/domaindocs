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
                    render: (data: Person) =>
                        `${data.firstName} ${data.lastName}`,
                    onClick: (row) => {
                        console.log('clicked row', row)
                    },
                },
                {
                    label: 'Subdomain',
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
                    render: (data: Person) => {
                        if (data.skills.length) {
                            return `${data.skills.map((s) => s.skillName).join(' | ')}`
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
