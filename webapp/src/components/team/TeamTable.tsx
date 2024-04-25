import { Table } from '../table/Table';
import { DetailedTeamDto } from '@domaindocs/lib';
import { Badge } from '@chakra-ui/react';

type TeamTableProps = {
    teams: DetailedTeamDto[];
    onTeamClick: (team: DetailedTeamDto) => void;
};

export const TeamTable = (props: TeamTableProps) => {
    const { teams, onTeamClick } = props;

    return (
        <Table
            data={teams}
            fields={[
                {
                    label: 'Team',
                    render: (data: DetailedTeamDto) => `${data.team.name}`,
                    onClick: (row) => {
                        onTeamClick(row);
                    },
                },
                {
                    label: 'Members',
                    render: (data: DetailedTeamDto) => `${data.members.length} Members`,
                    onClick: (row) => {
                        console.log('clicked row', row);
                    },
                },
                {
                    label: 'Projects',
                    render: (data: DetailedTeamDto) => {
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
