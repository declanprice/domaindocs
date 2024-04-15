import { Table } from '@components/table/Table.tsx'
import { DetailedTeam } from '@state/api/teams-api.ts'

type TeamTableProps = {
    teams: DetailedTeam[]
    onTeamClick: (team: DetailedTeam) => void
}

export const TeamTable = (props: TeamTableProps) => {
    const { teams, onTeamClick } = props

    return (
        <Table
            data={teams}
            fields={[
                {
                    label: 'Team',
                    render: (data: DetailedTeam) => `${data.team.name}`,
                    onClick: (row) => {
                        onTeamClick(row)
                    },
                },
                {
                    label: 'Subdomain',
                    render: (data: DetailedTeam) =>
                        `${data.subdomain.subdomainName}`,
                    onClick: (row) => {
                        console.log('clicked row', row)
                    },
                },
                {
                    label: 'Members',
                    render: (data: DetailedTeam) =>
                        `${data.members.length} Members`,
                    onClick: (row) => {
                        console.log('clicked row', row)
                    },
                },
            ]}
        />
    )
}
