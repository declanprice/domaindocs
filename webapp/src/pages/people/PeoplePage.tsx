import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { peopleApi } from '../../state/api/people-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { DetailedPerson } from '@domaindocs/types';
import { CiSearch } from 'react-icons/ci';
import { PeopleTable } from './components/PeopleTable';

type PeoplePageParams = {
    domainId: string;
};

export const PeoplePage = () => {
    const { domainId } = useParams() as PeoplePageParams;

    const navigate = useNavigate();

    const { data: people, isLoading } = useQuery<DetailedPerson[]>({
        queryKey: ['searchPeople', { domainId }],
        queryFn: () => peopleApi.search(domainId, {}),
    });

    if (!people || isLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" p={4} width={'100%'} gap={4}>
            <Flex alignItems={'center'}>
                <Heading variant={'h2'} fontSize={18} fontWeight={400}>
                    People
                </Heading>

                <Button ml={'auto'} size={'sm'} fontWeight={400}>
                    Invite People
                </Button>
            </Flex>

            <Text fontWeight={300} fontSize={14}>
                Search for people across your domain.
            </Text>

            <Flex alignItems={'center'} gap={2} mt={4}>
                <Button size={'sm'} color={'gray.900'} fontWeight={'300'}>
                    <CiSearch />
                    <Text ml={2}>Search people</Text>
                </Button>

                <Button size={'sm'} color={'gray.900'} fontWeight={'300'}>
                    <Text ml={2}>Roles</Text>
                </Button>

                <Button size={'sm'} color={'gray.900'} fontWeight={'300'}>
                    <Text ml={2}>Skills</Text>
                </Button>
            </Flex>

            <PeopleTable
                people={people}
                onPersonClick={(person) => {
                    navigate(`/${domainId}/people/${person.person.userId}`);
                }}
            />
        </Flex>
    );
};
