import { Table } from '../../../components/table/Table';
import { DetailedTeam, TeamProject } from '@domaindocs/types';
import { Avatar, AvatarGroup, Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { GoPeople } from 'react-icons/go';
import { TbDots } from 'react-icons/tb';

type TeamTableProps = {
    teams: DetailedTeam[];
    onTeamClick: (team: DetailedTeam) => void;
    onProjectClick?: (project: TeamProject) => void;
};

export const TeamsTable = (props: TeamTableProps) => {
    const { teams, onTeamClick } = props;

    return (
        <Table
            data={teams}
            fields={[
                {
                    label: 'Team',
                    columnWidth: '20%',
                    render: (data: DetailedTeam) => {
                        return (
                            <Flex alignItems="center">
                                <Flex alignItems={'center'} backgroundColor={'purple.400'} rounded={6} p={2}>
                                    <GoPeople color={'white'} />
                                </Flex>

                                <Text ml={2}>{data.team.name}</Text>
                            </Flex>
                        );
                    },
                    onClick: (row) => {
                        onTeamClick(row);
                    },
                },
                {
                    label: 'Description',
                    columnWidth: '500px',
                    render: (data: DetailedTeam) => {
                        return (
                            <Text
                                mr={6}
                                fontSize={12}
                                textOverflow={'ellipsis'}
                                overflow={'hidden'}
                                whiteSpace={'nowrap'}
                            >
                                {data.team.description}
                            </Text>
                        );
                    },
                    onClick: (row) => {
                        console.log('clicked row', row);
                    },
                },
                {
                    label: 'Members',
                    render: (data: DetailedTeam) => {
                        return (
                            <AvatarGroup>
                                {data.members.map((member) => (
                                    <Avatar
                                        name={`${member.firstName} ${member.lastName}`}
                                        src={member.iconUri}
                                        size={'xs'}
                                    />
                                ))}
                            </AvatarGroup>
                        );
                    },
                    onClick: (row) => {
                        console.log('clicked row', row);
                    },
                },
                {
                    headerAlign: 'end',
                    label: 'Actions',
                    render: (data: DetailedTeam) => {
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
