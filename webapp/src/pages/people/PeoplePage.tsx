import { Box, Button, Flex, Stack } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { peopleApi } from '../../state/api/people-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { TableToolbar } from '../../components/table/TableToolbar';
import { PersonTable } from '../../components/person/PersonTable';
import { DetailedPersonDto } from '@domaindocs/lib';
import { PeoplePageToolbar } from './PeoplePageToolbar';
import { MdAddIcCall, MdPlusOne } from 'react-icons/md';
import { IoAdd, IoAddOutline, IoAddSharp } from 'react-icons/io5';

type PeoplePageParams = {
    domainId: string;
};

export const PeoplePage = () => {
    const { domainId } = useParams() as PeoplePageParams;

    const navigate = useNavigate();

    const { data: people, isLoading } = useQuery<DetailedPersonDto[]>({
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
