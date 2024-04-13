import { Table } from '@components/table/Table.tsx'
import { Team } from '@state/api/teams-api.ts'

type TeamTableProps = {
    teams: Team[]
}

export const TeamTable = (props: TeamTableProps) => {
    const { teams } = props

    return (
        <Table
            data={teams}
            fields={[
                {
                    label: 'Team',
                    name: 'name',
                    render: (data: Team) => `${data.name}`,
                    onClick: (row) => {
                        console.log('clicked row', row)
                    },
                },
                {
                    label: 'Subdomains',
                    name: 'subdomains',
                    render: (data: Team) =>
                        `${data.subdomains.map((s) => s.subdomainName).join(' | ')}`,
                    onClick: (row) => {
                        console.log('clicked row', row)
                    },
                },
                {
                    label: 'People',
                    name: 'people',
                    render: (data: Team) => `${data.people.length} People`,
                    onClick: (row) => {
                        console.log('clicked row', row)
                    },
                },
            ]}
        />
    )
}
