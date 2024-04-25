import { Table } from '../table/Table';
import { DetailedProject, isPersonOwnership, isTeamOwnership } from '@domaindocs/lib';

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
                    label: 'Owned By',
                    render: (data: DetailedProject) =>
                        `${data.ownership
                            .map((o) => {
                                if (isPersonOwnership(o)) {
                                    return `${o.firstName} ${o.lastName}`;
                                }

                                if (isTeamOwnership(o)) {
                                    return o.name;
                                }
                            })
                            .join(' | ')}`,
                    onClick: () => {},
                },
            ]}
        />
    );
};
