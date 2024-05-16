import { Box, Button, Flex, Stack } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { peopleApi } from '../../state/api/people-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { TableToolbar } from '../../components/table/TableToolbar';
import { PersonTable } from '../../components/person/PersonTable';
import { PeoplePageToolbar } from './PeoplePageToolbar';
import { IoAddOutline } from 'react-icons/io5';
import { DetailedPerson } from '@domaindocs/lib';

type PeoplePageParams = {
    domainId: string;
};

export const PeoplePage = () => {
    const { domainId } = useParams() as PeoplePageParams;

    const navigate = useNavigate();

    const { data: people, isLoading } = useQuery<DetailedPerson[]>({
        queryKey: ['searchPeople', { domainId }],
        queryFn: () => peopleApi.searchPeople(domainId, {}),
    });

    if (!people || isLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" width={'100%'}>
            <PeoplePageToolbar />

            <Box height={'100%'} width={'100%'} overflowY={'auto'}>
                <Flex p={4} width={'100%'} direction={'column'}>
                    <TableToolbar
                        title={'People (3)'}
                        tabs={[
                            {
                                label: 'All',
                                onClick: () => {},
                                isActive: true,
                            },
                            {
                                label: 'My Team Members',
                                onClick: () => {},
                                isActive: false,
                            },
                        ]}
                        actions={
                            <Button variant={'ghost'} size={'sm'} fontWeight={'regular'} leftIcon={<IoAddOutline />}>
                                Invite
                            </Button>
                        }
                        onSearch={() => {}}
                        onFilterClick={() => {}}
                    />

                    <PersonTable
                        people={people}
                        onPersonClick={(person) => {
                            navigate(`/${domainId}/people/${person.person.userId}`);
                        }}
                    />
                </Flex>
            </Box>
        </Flex>
    );
};
