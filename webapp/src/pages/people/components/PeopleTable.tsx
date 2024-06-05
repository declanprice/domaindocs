import {
    Avatar,
    Box,
    Flex,
    IconButton,
    Popover,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverTrigger,
    Stack,
    Text,
} from '@chakra-ui/react';
import { Table } from '../../../components/table/Table';
import { DetailedTeam, SearchPerson } from '@domaindocs/types';
import { PersonAvatar } from '../../../components/person/PersonAvatar';
import { TbDots } from 'react-icons/tb';

type PeopleTableProps = {
    people: SearchPerson[];
    onPersonClick: (person: SearchPerson) => void;
};

export const PeopleTable = (props: PeopleTableProps) => {
    const { people, onPersonClick } = props;

    return (
        <Table
            data={people}
            fields={[
                {
                    label: 'Person',
                    render: (data: SearchPerson) => (
                        <Flex alignItems="center" gap={2}>
                            <Avatar
                                size={'xs'}
                                name={`${data.person.firstName} ${data.person.lastName}`}
                                src={data.person.iconUri}
                            />

                            <Text>
                                {data.person.firstName} {data.person.lastName}
                            </Text>
                        </Flex>
                    ),
                    onClick: (row) => {
                        onPersonClick(row);
                    },
                },
                {
                    label: 'Email',
                    render: (data: SearchPerson) => {
                        return <Text>{data.person.email}</Text>;
                    },
                    onClick: (row) => {
                        console.log('clicked row', row);
                    },
                },
                {
                    label: 'Primary Role',
                    render: (data: SearchPerson) => {
                        const role = data.roles.find((r) => r.isPrimary);

                        if (!role) {
                            return <Text>No Role</Text>;
                        }

                        return <Text fontSize={12}>{role.roleName}</Text>;
                    },
                    onClick: (row) => {
                        console.log('clicked row', row);
                    },
                },
                {
                    label: 'Skills',
                    render: (data: SearchPerson) => {
                        const skills = data.skills;

                        if (!skills.length) {
                            return <Text>None</Text>;
                        }

                        return (
                            <Popover>
                                <PopoverTrigger>
                                    <Text _hover={{ textDecoration: 'underline' }} cursor={'pointer'}>
                                        {skills.length} {`${skills.length > 1 ? 'Skills' : 'Skill'}`}
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
                {
                    headerAlign: 'end',
                    label: 'Actions',
                    render: (data: SearchPerson) => {
                        return (
                            <Flex>
                                <IconButton
                                    ml={'auto'}
                                    aria-label={'teams-menu'}
                                    variant={'ghost'}
                                    icon={<TbDots />}
                                    size={'sm'}
                                />
                            </Flex>
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
