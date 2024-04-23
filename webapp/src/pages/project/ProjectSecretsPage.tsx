import { Box, Flex, Stack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ProjectOverview, Secret } from '@domaindocs/lib';

import { ProjectPageParams } from './ProjectPageParams';
import { projectsApi } from '../../state/api/projects-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { ProjectPageToolbar } from './ProjectPageToolbar';
import { secretsApi } from '../../state/api/secrets-api';
import { TableToolbar } from '../../components/table/TableToolbar';
import { SecretTable } from '../../components/secret/SecretTable';

export const ProjectSecretsPage = () => {
    const { domainId, projectId } = useParams() as ProjectPageParams;

    const { data: project, isLoading } = useQuery<ProjectOverview>({
        queryKey: ['projectOverview', { domainId, projectId }],
        queryFn: () => projectsApi.getProjectOverview(domainId, projectId),
    });

    const { data: secrets, isLoading: isSecretsLoading } = useQuery<Secret[]>({
        queryKey: ['searchSecrets', { domainId, projectId }],
        queryFn: () => secretsApi.searchSecrets(domainId, { projectId }),
    });

    if (!project || isLoading || !secrets || isSecretsLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" width={'100%'}>
            <ProjectPageToolbar projectName={project.summary.name} domainId={domainId} projectId={projectId} />

            <Box height={'100%'} width={'100%'} overflowY={'auto'}>
                <Flex p={4} gap={4} width={'100%'} direction={'column'}>
                    <Stack>
                        <TableToolbar
                            title={`Secrets (${secrets.length})`}
                            onSearch={() => {}}
                            onFilterClick={() => {}}
                        />

                        <SecretTable
                            secrets={secrets}
                            onSecretClick={(secret: Secret) => {
                                console.log('clicked secret', secret);
                            }}
                        />
                    </Stack>
                </Flex>
            </Box>
        </Flex>
    );
};
