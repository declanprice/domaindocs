import { Table } from '../../../components/table/Table';
import { DetailedTeam } from '@domaindocs/types';
import { Flex, IconButton, Link, Text, useDisclosure } from '@chakra-ui/react';
import { GoPeople } from 'react-icons/go';
import { TbDots } from 'react-icons/tb';
import { Avatar, AvatarGroup } from '../../../components/ui/avatar';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '../../../components/ui/menu';
import { ConfirmDialog } from '../../../components/dialogs/ConfirmDialog';

type TeamTableProps = {
    teams: DetailedTeam[];
    onTeamClick: (team: DetailedTeam) => void;
    onRemove: (team: DetailedTeam) => Promise<void>;
};

export const TeamsTable = (props: TeamTableProps) => {
    const { teams, onTeamClick, onRemove } = props;

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
                                    <GoPeople color={'white'} size={18} />
                                </Flex>

                                <Link
                                    ml={4}
                                    textStyle={'sm'}
                                    whiteSpace={'nowrap'}
                                    overflow={'hidden'}
                                    textOverflow={'ellipsis'}
                                >
                                    {data.team.name}
                                </Link>
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
                        return <TeamsTableActions team={data} onRemove={onRemove} />;
                    },
                    onClick: (row) => {
                        console.log('clicked row', row);
                    },
                },
            ]}
        />
    );
};

type TeamsTableActionsProps = {
    team: DetailedTeam;
    onRemove: (team: DetailedTeam) => Promise<void>;
};

export const TeamsTableActions = (props: TeamsTableActionsProps) => {
    const removeDialog = useDisclosure();

    return (
        <Flex>
            <MenuRoot>
                <MenuTrigger as={IconButton} ml={'auto'} aria-label={'teams-menu'} variant={'ghost'}>
                    <TbDots />
                </MenuTrigger>

                <MenuContent>
                    <MenuItem onClick={removeDialog.onOpen}>Remove</MenuItem>
                </MenuContent>
            </MenuRoot>

            <ConfirmDialog
                header={'Remove team'}
                body={'Are you sure you want to remove this team?'}
                isOpen={removeDialog.open}
                onConfirm={async () => {
                    await props.onRemove(props.team);
                }}
                onClose={removeDialog.onClose}
            />
        </Flex>
    );
};
