import { Box, Flex, Heading } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ProjectOverview } from '@domaindocs/lib';

import { ProjectPageParams } from './ProjectPageParams';
import { projectsApi } from '../../state/api/projects-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { ProjectPageToolbar } from './ProjectPageToolbar';
import { ProjectSummary } from './components/ProjectSummary';
import { ProjectLinks } from './components/ProjectLinks';
import { ProjectOwnership } from './components/ProjectOwnership';

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

            <Box height={'100%'} width={'100%'} overflowY={'auto'}>
                <Flex p={4} gap={4} width={'100%'} direction={'column'}>
                    <Heading width={'100%'} size={'md'} fontWeight={'regular'}>
                        {project.name}
                    </Heading>

                    <ProjectSummary
                        domainId={domainId}
                        projectId={projectId}
                        description={project.description}
                        onDescriptionChange={async () => {
                            await refetch();
                        }}
                    />

                    <ProjectOwnership
                        domainId={domainId}
                        projectName={project.name}
                        projectId={projectId}
                        ownership={project.ownership}
                    />

                    <ProjectLinks
                        domainId={domainId}
                        projectName={project.name}
                        projectId={projectId}
                        links={project.links}
                        onAddLink={async () => {
                            await refetch();
                        }}
                    />
                </Flex>
            </Box>
        </Flex>
    );
};
