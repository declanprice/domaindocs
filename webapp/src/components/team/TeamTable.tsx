import { Table } from '../table/Table';
import { DetailedTeam } from '@domaindocs/lib';
import { Badge } from '@chakra-ui/react';

type TeamTableProps = {
    teams: DetailedTeam[];
    onTeamClick: (team: DetailedTeam) => void;
};

export const TeamTable = (props: TeamTableProps) => {
    const { teams, onTeamClick } = props;

    return (
        <Table
            data={teams}
            fields={[
                {
                    label: 'Team',
                    render: (data: DetailedTeam) => `${data.team.name}`,
                    onClick: (row) => {
                        onTeamClick(row);
                    },
                },
                {
                    label: 'Members',
                    render: (data: DetailedTeam) => `${data.members.length} Members`,
                    onClick: (row) => {
                        console.log('clicked row', row);
                    },
                },
                {
                    label: 'Projects',
                    render: (data: DetailedTeam) => {
                        if (data.projects.length) {
                            return data.projects.map((p) => p.projectName).join(' | ');
                        }

                        return (
                            <Badge size={'xs'} colorScheme={'purple'}>
                                No Projects
                            </Badge>
                        );
                    },
                    onClick: (row) => {
                        console.log('clicked row', row);
                    },
                },
            ]}
        />
    );
};
