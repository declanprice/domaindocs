import { Person } from '@state/api/people-api.ts'
import { Table } from '@components/table/Table.tsx'

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
                    render: (data: Person) => `Supporting`,
                    onClick: (row) => {
                        console.log('clicked row', row)
                    },
                },
                {
                    label: 'Teams',
                    name: 'teams',
                    render: (data: Person) => `Team Orion | Team Keplar`,
                    onClick: (row) => {
                        console.log('clicked row', row)
                    },
                },
                {
                    label: 'Skills',
                    name: 'skills',
                    render: (data: Person) => `Javascript | Node.js | AWS`,
                    onClick: (row) => {
                        console.log('clicked row', row)
                    },
                },
            ]}
        />
    )
}
