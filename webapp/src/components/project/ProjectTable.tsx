import { Badge } from '@chakra-ui/react';
import { Table } from '../table/Table';
import { DetailedProjectDto } from '@domaindocs/lib';

type ProjectTableProps = {
  projects: DetailedProjectDto[];
  onProjectClick: (team: DetailedProjectDto) => void;
};

export const ProjectTable = (props: ProjectTableProps) => {
  const { projects, onProjectClick } = props;

  return (
    <Table
      data={projects}
      fields={[
        {
          label: 'Project',
          render: (data: DetailedProjectDto) => `${data.project.name}`,
          onClick: (row) => {
            onProjectClick(row);
          },
        },
        {
          label: 'Subdomain',
          render: (data: DetailedProjectDto) => `${data.subdomain.name}`,
          onClick: () => {},
        },
        {
          label: 'Team',
          render: (data: DetailedProjectDto) => `${data.team.name}`,
          onClick: () => {},
        },
        {
          label: 'Technologies',
          render: (data: DetailedProjectDto) => {
            if (data.technologies.length) {
              return data.technologies.map((t) => t.name).join(' | ');
            } else {
              return (
                <Badge size={'xs'} colorScheme={'gray'}>
                  N/A
                </Badge>
              );
            }
          },
          onClick: () => {},
        },
      ]}
    />
  );
};
