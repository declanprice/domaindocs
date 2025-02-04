import { Table } from '../../../components/table/Table';
import { SearchComponent } from '@domaindocs/types';
import { Box, Flex, Link, Stack, Text } from '@chakra-ui/react';
import { LuComponent } from 'react-icons/lu';
import { GoPeople } from 'react-icons/go';

type ComponentTableProps = {
    domainId: string;
    components: SearchComponent[];
    onComponentClick: (component: SearchComponent) => void;
};

export const ComponentTable = (props: ComponentTableProps) => {
    const { domainId, components, onComponentClick } = props;

    return (
        <Table
            data={components}
            fields={[
                {
                    label: 'Component',
                    render: (data: SearchComponent) => {
                        return (
                            <Flex alignItems="center" gap={3}>
                                <Flex alignItems={'center'} backgroundColor={'teal.400'} rounded={6} p={2}>
                                    <LuComponent color={'white'} size={18} />
                                </Flex>
                                <Link textStyle={'sm'}>{data.component.name}</Link>
                            </Flex>
                        );
                    },
                    onClick: (row) => {
                        onComponentClick(row);
                    },
                },
                {
                    label: 'Owner Team',
                    render: (data: SearchComponent) => {
                        if (data.team) {
                            return (
                                <Link
                                    textStyle={'sm'}
                                    target={'_blank'}
                                    href={`/${domainId}/teams/${data.team.teamId}`}
                                >
                                    {data.team.name}
                                </Link>
                            );
                        }

                        return <Text>No Owner</Text>;
                    },
                    onClick: () => {},
                },
                {
                    label: 'Subdomain',
                    render: (data: SearchComponent) => {
                        return <Text fontSize={14}>{data.subdomain?.name ? data.subdomain.name : 'No Subdomain'}</Text>;
                    },
                    onClick: () => {},
                },
            ]}
        />
    );
};
