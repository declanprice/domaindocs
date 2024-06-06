import { Avatar, AvatarGroup, Flex, IconButton, Link } from '@chakra-ui/react';
import { Table } from '../../../components/table/Table';
import { DetailedTeam, DetailedWorkArea } from '@domaindocs/types';
import { GoPeople } from 'react-icons/go';
import { TbDots } from 'react-icons/tb';
import { MdOutlineWorkOutline } from 'react-icons/md';

type WorkAreasTableProps = {
    areas: DetailedWorkArea[];
    onAreaClick: (person: DetailedWorkArea) => void;
};

export const WorkAreasTable = (props: WorkAreasTableProps) => {
    const { areas, onAreaClick } = props;

    return (
        <Table
            data={areas}
            fields={[
                {
                    label: 'Area',
                    render: (data: DetailedWorkArea) => {
                        return (
                            <Flex alignItems="center">
                                <Flex alignItems={'center'} backgroundColor={'gray.500'} rounded={6} p={2}>
                                    <MdOutlineWorkOutline color={'white'} />
                                </Flex>

                                <Link ml={2}>{data.area.name}</Link>
                            </Flex>
                        );
                    },
                    onClick: (row) => {
                        onAreaClick(row);
                    },
                },
                {
                    label: 'People',
                    render: (data: DetailedWorkArea) => {
                        return (
                            <AvatarGroup>
                                {data.people.map((person) => (
                                    <Avatar
                                        name={`${person.firstName} ${person.lastName}`}
                                        src={person.iconUri}
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
