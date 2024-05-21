import { Table } from '../table/Table';
import { DetailedTeam, TeamProject } from '@domaindocs/lib';
import {
    Link,
    Popover,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverTrigger,
    Stack,
    Text,
} from '@chakra-ui/react';
import { TeamAvatar } from './TeamAvatar';
import { PersonAvatar } from '../person/PersonAvatar';

type TeamTableProps = {
    teams: DetailedTeam[];
    onTeamClick: (team: DetailedTeam) => void;
    onProjectClick?: (project: TeamProject) => void;
};

export const TeamTable = (props: TeamTableProps) => {
    const { teams, onTeamClick } = props;

    return (
        <Table
            data={teams}
            fields={[
                {
                    label: 'Team',
                    render: (data: DetailedTeam) => {
                        return <TeamAvatar name={data.team.name} nameLink={true} iconUri={data.team.iconUri} small />;
                    },
                    onClick: (row) => {
                        onTeamClick(row);
                    },
                },
                {
                    label: 'Members',
                    render: (data: DetailedTeam) => {
                        if (!data.members.length) {
                            return <Text>No Members</Text>;
                        }

                        return (
                            <Popover>
                                <PopoverTrigger>
                                    <Text _hover={{ textDecoration: 'underline' }} cursor={'pointer'}>
                                        {data.members.length} Members
                                    </Text>
                                </PopoverTrigger>
                                <PopoverContent backgroundColor={'lightgray'}>
                                    <PopoverCloseButton />
                                    <PopoverBody>
                                        <Stack spacing={2}>
                                            {data.members.map((m) => (
                                                <PersonAvatar
                                                    firstName={m.firstName}
                                                    lastName={m.lastName}
                                                    iconUri={m.iconUri}
                                                    roles={m.roles}
                                                    small
                                                />
                                            ))}
                                        </Stack>
                                    </PopoverBody>
                                </PopoverContent>
                            </Popover>
                        );
                    },
                    onClick: (row) => {
                        console.log('clicked row', row);
                    },
                },
                {
                    label: 'Projects',
                    render: (data: DetailedTeam) => {
                        if (!data.projects.length) {
                            return <Text>No Projects</Text>;
                        }

                        if (data.projects.length === 1) {
                            const project = data.projects[0];
                            return (
                                <Link
                                    onClick={() => {
                                        if (props.onProjectClick) {
                                            props.onProjectClick(project);
                                        }
                                    }}
                                >
                                    {project.projectName}
                                </Link>
                            );
                        }

                        return (
                            <Popover>
                                <PopoverTrigger>
                                    <Text _hover={{ textDecoration: 'underline' }} cursor={'pointer'}>
                                        {data.projects.length} Projects
                                    </Text>
                                </PopoverTrigger>
                                <PopoverContent backgroundColor={'lightgray'}>
                                    <PopoverCloseButton />
                                    <PopoverBody>
                                        <Stack spacing={2}>
                                            {data.projects.map((p) => (
                                                <Link
                                                    onClick={() => {
                                                        if (props.onProjectClick) {
                                                            props.onProjectClick(p);
                                                        }
                                                    }}
                                                >
                                                    {p.projectName}
                                                </Link>
                                            ))}
                                        </Stack>
                                    </PopoverBody>
                                </PopoverContent>
                            </Popover>
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
