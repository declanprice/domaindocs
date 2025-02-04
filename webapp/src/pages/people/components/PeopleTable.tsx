import { Flex, IconButton, Popover, PopoverBody, PopoverContent, PopoverTrigger, Stack, Text } from '@chakra-ui/react';
import { SearchPerson } from '@domaindocs/types';
import { TbDots } from 'react-icons/tb';
import { Table } from '../../../components/table/Table';
import { Avatar } from '../../../components/ui/avatar';

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
                        <Flex alignItems="center" gap={3}>
                            <Avatar
                                size={'sm'}
                                name={`${data.person.firstName} ${data.person.lastName}`}
                                src={data.person.iconUri}
                            />

                            <Text fontSize={14}>
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
                        return <Text fontSize={14}>{data.person.email}</Text>;
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
                            return <Text fontSize={14}>No Role</Text>;
                        }

                        return <Text fontSize={14}>{role.roleName}</Text>;
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
                            return <Text fontSize={14}>None</Text>;
                        }

                        return (
                            <Popover.Root>
                                <PopoverTrigger>
                                    <Text fontSize={14} _hover={{ textDecoration: 'underline' }} cursor={'pointer'}>
                                        {skills.length} {`${skills.length > 1 ? 'Skills' : 'Skill'}`}
                                    </Text>
                                </PopoverTrigger>
                                <PopoverContent backgroundColor={'lightgray'}>
                                    <Popover.CloseTrigger />
                                    <PopoverBody>
                                        <Stack h={2}>
                                            {skills.map((s) => (
                                                <Text key={s.skillId} fontSize={14}>
                                                    {s.skillName}
                                                </Text>
                                            ))}
                                        </Stack>
                                    </PopoverBody>
                                </PopoverContent>
                            </Popover.Root>
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
                                <IconButton ml={'auto'} aria-label={'teams-menu'} variant={'ghost'}>
                                    <TbDots />
                                </IconButton>
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
