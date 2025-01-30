import { Box, Flex, Text } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { DetailedTeam } from '@domaindocs/types';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { teamsApi } from '../../state/api/teams-api';
import { TeamPageParams } from './TeamPageParams';
import React from 'react';
import { GoPeople } from 'react-icons/go';
import { TeamDetails } from './components/TeamDetails';
import { TeamDescription } from './components/TeamDescription';
import { TeamContacts } from './components/TeamContacts';
import { TeamLinks } from './components/TeamLinks';
import { TeamMembers } from './components/TeamMembers';
import { BreadcrumbLink, BreadcrumbRoot } from '../../components/ui/breadcrumb';

export const TeamOverviewPage = () => {
    const { domainId, teamId } = useParams() as TeamPageParams;

    const navigate = useNavigate();

    const { data: team, isLoading } = useQuery<DetailedTeam>({
        queryKey: ['getTeam', { domainId, teamId }],
        queryFn: () => teamsApi.get(domainId, teamId),
    });

    if (!team || isLoading) return <LoadingContainer />;

    return (
        <Flex width={'100%'}>
            <Flex direction="column" gap={4} flex={1} p={8}>
                <BreadcrumbRoot>
                    <BreadcrumbLink
                        href={`/${domainId}/people`}
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(`/${domainId}/teams`);
                        }}
                    >
                        Teams
                    </BreadcrumbLink>

                    <BreadcrumbLink
                        href={`/${domainId}/teams/${team.team.teamId}`}
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    >
                        {team.team.name}
                    </BreadcrumbLink>
                </BreadcrumbRoot>

                <Flex
                    mt={2}
                    alignItems={'center'}
                    justifyContent={'center'}
                    backgroundColor={'purple.400'}
                    width={'50px'}
                    height="50px"
                    rounded={6}
                    p={2}
                >
                    <GoPeople color={'white'} />
                </Flex>

                <Text mt={2} fontSize={20} fontWeight={500}>
                    {team.team.name}
                </Text>

                <Box mt={2}>
                    <TeamDescription domainId={domainId} team={team} />
                </Box>
            </Flex>

            <Flex direction={'column'} width={'350px'} p={4} gap={4}>
                <TeamDetails team={team} />

                <TeamMembers domainId={domainId} teamId={team.team.teamId} members={team.members} />

                <TeamContacts domainId={domainId} teamId={team.team.teamId} contacts={team.contacts} />

                <TeamLinks domainId={domainId} teamId={team.team.teamId} links={team.links} />
            </Flex>
        </Flex>
    );
};
