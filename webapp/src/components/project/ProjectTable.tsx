import { Badge } from '@chakra-ui/react';
import { Table } from '../table/Table';
import { DetailedProject } from '@domaindocs/lib';

type ProjectTableProps = {
  projects: DetailedProject[];
  onProjectClick: (team: DetailedProject) => void;
};

export const ProjectTable = (props: ProjectTableProps) => {
  const { projects, onProjectClick } = props;

  return (
    <Table
      data={projects}
      fields={[
        {
          label: 'Project',
          render: (data: DetailedProject) => `${data.project.name}`,
          onClick: (row) => {
            onProjectClick(row);
          },
        },
        {
          label: 'Subdomain',
          render: (data: DetailedProject) => `${data.subdomain.name}`,
          onClick: () => {},
        },
        {
          label: 'Team',
          render: (data: DetailedProject) => `${data.team.name}`,
          onClick: () => {},
        },
        {
          label: 'Technologies',
          render: (data: DetailedProject) => {
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
