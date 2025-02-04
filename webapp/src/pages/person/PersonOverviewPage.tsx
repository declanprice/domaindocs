import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Text } from '@chakra-ui/react';
import { DetailedPerson } from '@domaindocs/types';
import { useNavigate, useParams } from 'react-router-dom';
import { PersonPageParams } from './PersonPageParams';
import { useQuery } from '@tanstack/react-query';
import { peopleApi } from '../../state/api/people-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { PersonDetails } from './components/PersonDetails';
import { PersonDescription } from './components/PersonDescription';
import { BreadcrumbRoot } from '../../components/ui/breadcrumb';
import React from 'react';
import { Avatar } from '../../components/ui/avatar';
import { PersonRoles } from './components/PersonRoles';
import { PersonSkills } from './components/PersonSkills';
import { PersonContacts } from './components/PersonContacts';

export const PersonOverviewPage = () => {
    const { domainId, userId } = useParams() as PersonPageParams;

    const navigate = useNavigate();

    const {
        data: person,
        isLoading,
        refetch,
    } = useQuery<DetailedPerson>({
        queryKey: ['getPerson', { domainId, userId }],
        queryFn: () => peopleApi.get(domainId, userId),
    });

    if (!person || isLoading) return <LoadingContainer />;

    return (
        <Flex width={'100%'}>
            <Flex direction="column" gap={4} flex={1} p={8}>
                <BreadcrumbRoot>
                    <BreadcrumbLink
                        href={`/${domainId}/people`}
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(`/${domainId}/people`);
                        }}
                    >
                        People
                    </BreadcrumbLink>

                    <BreadcrumbLink
                        href={`/${domainId}/people/${userId}`}
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    >
                        {person.person.firstName} {person.person.lastName}
                    </BreadcrumbLink>
                </BreadcrumbRoot>

                <Avatar
                    name={`${person.person.firstName} ${person.person.lastName}`}
                    src={person.person.iconUri}
                    size={'2xl'}
                />

                <Text fontSize={18} fontWeight={500}>
                    {person.person.firstName} {person.person.lastName}
                </Text>

                <Box mt={2}>
                    <PersonDescription domainId={domainId} person={person} />
                </Box>
            </Flex>

            <Flex direction={'column'} width={'450px'} p={4} gap={4}>
                <PersonDetails person={person} />

                <PersonRoles domainId={domainId} person={person} />

                <PersonSkills domainId={domainId} person={person} />

                <PersonContacts domainId={domainId} userId={userId} contacts={person.contacts} />

                {/*<PersonTeams domainId={domainId} userId={person.person.userId} teams={person.teams} />*/}
            </Flex>
        </Flex>
    );
};
