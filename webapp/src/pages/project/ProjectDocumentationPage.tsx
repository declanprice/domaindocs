import { Box, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Documentation, DocumentationType, ProjectOverview } from '@domaindocs/lib';

import { ProjectPageParams } from './ProjectPageParams';
import { projectsApi } from '../../state/api/projects-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { ProjectPageToolbar } from './ProjectPageToolbar';
import { DocumentationNavigator } from '../../components/documentation/navigator/DocumentationNavigator';
import { documentationApi } from '../../state/api/documentation-api';

export const ProjectDocumentationPage = () => {
    const { domainId, projectId } = useParams() as ProjectPageParams;

    const { data: project, isLoading: isProjectLoading } = useQuery<ProjectOverview>({
        queryKey: ['projectOverview', { domainId, projectId }],
        queryFn: () => projectsApi.getProjectOverview(domainId, projectId),
    });

    const { data: documentation, isLoading: isDocsLoading } = useQuery<Documentation[]>({
        queryKey: ['searchDocumentation', { domainId, projectId }],
        queryFn: () => documentationApi.search(domainId, { projectId }),
    });

    if (!project || isProjectLoading || !documentation || isDocsLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" width={'100%'}>
            <ProjectPageToolbar projectName={project.summary.name} domainId={domainId} projectId={projectId} />

            <Flex height={'100%'} width={'100%'} direction={'column'}>
                <DocumentationNavigator
                    documentation={documentation}
                    onDocumentClick={() => {}}
                    onAddFile={(documentationId) => {
                        // addDocumentation({
                        //     documentationId,
                        //     type: DocumentationType.FILE,
                        // });
                    }}
                    onAddFolder={(documentationId) => {
                        // addDocumentation({
                        //     documentationId,
                        //     type: DocumentationType.FOLDER,
                        // });
                    }}
                />

                <Box flex={1}></Box>
            </Flex>
        </Flex>
    );
};
