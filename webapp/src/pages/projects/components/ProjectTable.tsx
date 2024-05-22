import { Table } from '../../../components/table/Table';
import { DetailedProject, isPersonOwnership, isTeamOwnership, ProjectOwnership } from '@domaindocs/lib';
import {
    Link,
    ListItem,
    Popover,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverTrigger,
    Stack,
    Text,
} from '@chakra-ui/react';
import { TeamAvatar } from '../../../components/team/TeamAvatar';
import { PersonAvatar } from '../../../components/person/PersonAvatar';

type ProjectTableProps = {
    projects: DetailedProject[];
    onProjectClick: (team: DetailedProject) => void;
};

export const ProjectTable = (props: ProjectTableProps) => {
    const { projects, onProjectClick } = props;

    const renderOwnershipItem = (o: ProjectOwnership) => {
        if (isPersonOwnership(o)) {
            return (
                <>
                    <PersonAvatar {...o} />
                    <Text> {o.description} </Text>
                </>
            );
        }

        if (isTeamOwnership(o)) {
            return (
                <TeamAvatar
                    key={o.teamId}
                    name={o.name}
                    iconUri={o.iconUri}
                    subTitle={o.description || 'Full Ownership'}
                    small
                />
            );
        }
    };
    return (
        <Table
            data={projects}
            fields={[
                {
                    label: 'Project',
                    render: (data: DetailedProject) => <Link>{data.project.name}</Link>,
                    onClick: (row) => {
                        onProjectClick(row);
                    },
                },
                {
                    label: 'Owned By',
                    render: (data: DetailedProject) => {
                        const ownership = data.ownership;

                        if (!ownership.length) {
                            return null;
                        }

                        if (ownership.length === 1) {
                            return renderOwnershipItem(ownership[0]);
                        }

                        return (
                            <Popover>
                                <PopoverTrigger>
                                    <Text _hover={{ textDecoration: 'underline' }} cursor={'pointer'}>
                                        {ownership.length} Owners
                                    </Text>
                                </PopoverTrigger>
                                <PopoverContent backgroundColor={'lightgray'}>
                                    <PopoverCloseButton />
                                    <PopoverBody>
                                        <Stack spacing={2}>{ownership.map(renderOwnershipItem)}</Stack>
                                    </PopoverBody>
                                </PopoverContent>
                            </Popover>
                        );
                    },
                    onClick: () => {},
                },
            ]}
        />
    );
};
