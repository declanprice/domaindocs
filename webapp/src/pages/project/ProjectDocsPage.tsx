import { Box, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Documentation, ProjectOverview } from '@domaindocs/lib';

import { ProjectPageParams } from './ProjectPageParams';
import { projectsApi } from '../../state/api/projects-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { ProjectPageToolbar } from './ProjectPageToolbar';
import { documentationApi } from '../../state/api/documentation-api';
import { DocumentationViewer } from '../../components/documentation/DocumentationViewer';

export const ProjectDocsPage = () => {
    const { domainId, projectId } = useParams() as ProjectPageParams;

    const { data: project, isLoading: isProjectLoading } = useQuery<ProjectOverview>({
        queryKey: ['projectOverview', { domainId, projectId }],
        queryFn: () => projectsApi.getProjectOverview(domainId, projectId),
    });

    const {
        data: documentation,
        isLoading: isDocumentationLoading,
        refetch: searchDocumentation,
    } = useQuery<Documentation[]>({
        queryKey: ['searchDocumentation', { domainId, projectId }],
        queryFn: () => documentationApi.search(domainId, { projectId }),
    });

    if (!project || isProjectLoading || !documentation || isDocumentationLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" width={'100%'}>
            <ProjectPageToolbar projectName={project.name} domainId={domainId} projectId={projectId} />

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
