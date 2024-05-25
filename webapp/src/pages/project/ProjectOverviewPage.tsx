import { Box, Divider, Flex, Heading, Stack, useDisclosure } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ProjectOverview } from '@domaindocs/types';

import { ProjectPageParams } from './ProjectPageParams';
import { projectsApi } from '../../state/api/projects-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { ProjectPageToolbar } from './ProjectPageToolbar';
import { ProjectSummary } from './components/ProjectSummary';
import { ProjectLinksList } from './components/ProjectLinksList';
import { ProjectOwnershipList } from './components/ProjectOwnershipList';
import React from 'react';

export const ProjectOverviewPage = () => {
    const { domainId, projectId } = useParams() as ProjectPageParams;

    const {
        data: project,
        isLoading,
        refetch,
    } = useQuery<ProjectOverview>({
        queryKey: ['projectOverview', { domainId, projectId }],
        queryFn: () => projectsApi.getProjectOverview(domainId, projectId),
    });

    if (!project || isLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" width={'100%'}>
            <ProjectPageToolbar projectName={project.name} domainId={domainId} projectId={projectId} />

            <Flex direction="column" width={'100%'} overflowY={'auto'} gap={6} p={8}>
                <Stack spacing={4}>
                    <Heading width={'100%'} size={'md'} fontWeight={'regular'}>
                        {project.name}
                    </Heading>

                    <ProjectSummary
                        domainId={domainId}
                        projectId={projectId}
                        description={project.description}
                        onEdit={refetch}
                    />
                </Stack>

                <Divider />

                <ProjectOwnershipList
                    domainId={domainId}
                    projectName={project.name}
                    projectId={projectId}
                    ownership={project.ownership}
                    onAddTeamOwnership={refetch}
                    onAddPersonOwnership={refetch}
                    onRemoveOwnership={refetch}
                />

                <Divider />

                <ProjectLinksList
                    domainId={domainId}
                    projectId={projectId}
                    links={project.links}
                    onAddLink={refetch}
                    onRemoveLink={refetch}
                />
            </Flex>
        </Flex>
    );
};
