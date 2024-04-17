import { Box, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ProjectOverview } from '@domaindocs/lib';

import { ProjectPageParams } from './ProjectPageParams';
import { projectsApi } from '../../../state/api/projects-api';
import { LoadingContainer } from '../../../components/loading/LoadingContainer';
import { ProjectPageToolbar } from './ProjectPageToolbar';

export const ProjectFilesPage = () => {
  const { domainId, projectId } = useParams() as ProjectPageParams;

  const { data: project, isLoading } = useQuery<ProjectOverview>({
    queryKey: ['projectOverview', { domainId, projectId }],
    queryFn: () => projectsApi.getProjectOverview(domainId, projectId),
  });

  if (!project || isLoading) return <LoadingContainer />;

  return (
    <Flex direction="column" width={'100%'}>
      <ProjectPageToolbar
        projectName={project.summary.name}
        domainId={domainId}
        projectId={projectId}
      />

      <Box height={'100%'} width={'100%'} overflowY={'auto'}>
        files
      </Box>
    </Flex>
  );
};
