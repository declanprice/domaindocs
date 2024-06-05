import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { peopleApi } from '../../state/api/people-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { SearchPerson } from '@domaindocs/types';
import { CiSearch } from 'react-icons/ci';
import { PeopleTable } from './components/PeopleTable';
import { FormTextInput } from '../../components/form/FormTextInput';
import { useForm } from 'react-hook-form';

type PeoplePageParams = {
    domainId: string;
};

export const PeoplePage = () => {
    const { domainId } = useParams() as PeoplePageParams;

    const navigate = useNavigate();

    const { data: people, isLoading } = useQuery<SearchPerson[]>({
        queryKey: ['searchPeople', { domainId }],
        queryFn: () => peopleApi.search(domainId, {}),
    });

    const form = useForm({
        values: {
            name: '',
        },
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
                <Box maxWidth={'180px'}>
                    <FormTextInput
                        name={'name'}
                        control={form.control}
                        placeholder={'Search people'}
                        leftElement={<CiSearch />}
                    />
                </Box>

                <Button size={'sm'} color={'gray.900'} fontWeight={'300'}>
                    <Text>Roles</Text>
                </Button>

                <Button size={'sm'} color={'gray.900'} fontWeight={'300'}>
                    <Text>Skills</Text>
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
