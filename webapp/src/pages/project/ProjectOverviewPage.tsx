import { Box, Divider, Flex, Heading, Stack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ProjectOverview } from '@domaindocs/lib';

import { ProjectPageParams } from './ProjectPageParams';
import { projectsApi } from '../../state/api/projects-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { ProjectPageToolbar } from './ProjectPageToolbar';
import { ProjectSummary } from './components/ProjectSummary';
import { ProjectLinksList } from './components/ProjectLinksList';
import { ProjectOwnershipList } from './components/ProjectOwnershipList';
import { TeamAvatar } from '../../components/team/TeamAvatar';
import { TeamSummary } from '../team/components/TeamSummary';
import { TeamMembersList } from '../team/components/TeamMembersList';
import { TeamProjectsList } from '../team/components/TeamProjectsList';
import React from 'react';
import { useEditable } from '../../hooks/useEditable';
import { ProjectSummaryEdit } from './components/ProjectSummaryEdit';

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

    const editSummary = useEditable();

    if (!project || isLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" width={'100%'}>
            <ProjectPageToolbar projectName={project.name} domainId={domainId} projectId={projectId} />

            <Flex direction="column" width={'100%'} overflowY={'auto'} gap={6} p={8}>
                <Stack spacing={4}>
                    <Heading width={'100%'} size={'md'} fontWeight={'regular'}>
                        {project.name}
                    </Heading>

                    {editSummary.isEditing ? (
                        <ProjectSummaryEdit
                            domainId={domainId}
                            projectId={projectId}
                            description={project.description}
                            onCancel={editSummary.onClose}
                            onSubmit={async () => {
                                await refetch();
                                editSummary.onClose();
                            }}
                        />
                    ) : (
                        <ProjectSummary
                            domainId={domainId}
                            projectId={projectId}
                            description={project.description}
                            onEdit={editSummary.onEdit}
                        />
                    )}
                </Stack>

                <Divider />

                <ProjectOwnershipList
                    domainId={domainId}
                    projectName={project.name}
                    projectId={projectId}
                    ownership={project.ownership}
                />

                <Divider />

                <ProjectLinksList
                    domainId={domainId}
                    projectName={project.name}
                    projectId={projectId}
                    links={project.links}
                    onAddLink={async () => {
                        await refetch();
                    }}
                />
            </Flex>
        </Flex>
    );
};
