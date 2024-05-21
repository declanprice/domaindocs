import {
    Avatar,
    Badge,
    Box,
    Button,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Stack,
    Tag,
    TagLabel,
    Text,
    Tooltip,
} from '@chakra-ui/react';
import { Table } from '../table/Table';
import { DetailedPerson } from '@domaindocs/lib';
import { PersonAvatar } from './PersonAvatar';
import { TeamAvatar } from '../team/TeamAvatar';

type PeopleTableProps = {
    people: DetailedPerson[];
    onPersonClick: (person: DetailedPerson) => void;
};

export const PersonTable = (props: PeopleTableProps) => {
    const { people, onPersonClick } = props;

    return (
        <Table
            data={people}
            fields={[
                {
                    label: 'Person',
                    render: (data: DetailedPerson) => (
                        <Box cursor="pointer">
                            <PersonAvatar
                                firstName={data.person.firstName}
                                lastName={data.person.lastName}
                                iconUri={data.person.iconUri}
                                roles={data.roles}
                                small
                            />
                        </Box>
                    ),
                    onClick: (row) => {
                        onPersonClick(row);
                    },
                },
                {
                    label: 'Teams',
                    render: (data: DetailedPerson) => {
                        const teams = data.teams;

                        if (!teams.length) {
                            return <Text>None</Text>;
                        }

                        if (teams.length === 1) {
                            const team = teams[0];
                            return <TeamAvatar small name={team.teamName} iconUri={team.teamIconUri} />;
                        }

                        return (
                            <Popover>
                                <PopoverTrigger>
                                    <Text _hover={{ textDecoration: 'underline' }} cursor={'pointer'}>
                                        {teams.length} Teams
                                    </Text>
                                </PopoverTrigger>
                                <PopoverContent backgroundColor={'lightgray'}>
                                    <PopoverCloseButton />
                                    <PopoverBody>
                                        <Stack spacing={2}>
                                            {teams.map((t) => (
                                                <TeamAvatar
                                                    key={t.teamId}
                                                    small
                                                    name={t.teamName}
                                                    iconUri={t.teamIconUri}
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
                    label: 'Skills',
                    render: (data: DetailedPerson) => {
                        const skills = data.skills;

                        if (!skills.length) {
                            return <Text>None</Text>;
                        }

                        if (skills.length === 1) {
                            const skill = skills[0];
                            return <Text fontSize={12}>{skill.skillName}</Text>;
                        }

                        return (
                            <Popover>
                                <PopoverTrigger>
                                    <Text _hover={{ textDecoration: 'underline' }} cursor={'pointer'}>
                                        {skills.length} Skills
                                    </Text>
                                </PopoverTrigger>
                                <PopoverContent backgroundColor={'lightgray'}>
                                    <PopoverCloseButton />
                                    <PopoverBody>
                                        <Stack spacing={2}>
                                            {skills.map((s) => (
                                                <Text key={s.skillId} fontSize={12}>
                                                    {s.skillName}
                                                </Text>
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
