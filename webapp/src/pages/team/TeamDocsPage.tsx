import { Button, Flex, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { TeamPageParams } from './TeamPageParams';
import { useQuery } from '@tanstack/react-query';
import { DetailedTeam, Documentation } from '@domaindocs/types';
import { teamsApi } from '../../state/api/teams-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { documentationApi } from '../../state/api/documentation-api';
import { DocumentationViewer } from '../../components/documentation/DocumentationViewer';
import { CiSearch } from 'react-icons/ci';

export const TeamDocsPage = () => {
    const { domainId, teamId } = useParams() as TeamPageParams;

    const { data: team, isLoading } = useQuery<DetailedTeam>({
        queryKey: ['getTeam', { domainId, teamId }],
        queryFn: () => teamsApi.get(domainId, teamId),
    });

    const {
        data: documentation,
        isLoading: isDocumentationLoading,
        refetch: searchDocumentation,
    } = useQuery<Documentation[]>({
        queryKey: ['searchDocumentation', { domainId }],
        queryFn: () => documentationApi.search(domainId, { teamId }),
    });

    if (!team || !documentation || isLoading || isDocumentationLoading) return <LoadingContainer />;

    return (
        <Flex width={'100%'} p={4} direction="column" gap={2}>
            <Flex alignItems={'center'} gap={2}>
                <Button size={'sm'} maxWidth={'250px'} color={'gray.900'} fontWeight={'300'}>
                    <CiSearch />
                    <Text ml={2} textOverflow={'ellipsis'} overflow={'hidden'} whiteSpace={'nowrap'}>
                        Search {team.team.name.toLowerCase()} documentation
                    </Text>
                </Button>

                <Button size={'sm'} color={'gray.900'} fontWeight={'300'}>
                    <Text ml={2}>Type</Text>
                </Button>
            </Flex>

            <DocumentationViewer
                documentation={documentation}
                domainId={domainId}
                onChange={() => {
                    searchDocumentation();
                }}
            />
        </Flex>
    );
};
