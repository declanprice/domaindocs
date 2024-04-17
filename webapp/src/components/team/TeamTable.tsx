import { Table } from '../table/Table';
import { DetailedTeamDto } from '@domaindocs/lib';

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
          label: 'Subdomain',
          render: (data: DetailedTeamDto) => `${data.subdomain.subdomainName}`,
          onClick: (row) => {
            console.log('clicked row', row);
          },
        },
        {
          label: 'Members',
          render: (data: DetailedTeamDto) => `${data.members.length} Members`,
          onClick: (row) => {
            console.log('clicked row', row);
          },
        },
      ]}
    />
  );
};
