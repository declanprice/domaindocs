import { Box, Flex, Heading } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ProjectOverview } from '@domaindocs/lib';

import { ProjectPageParams } from './ProjectPageParams';
import { projectsApi } from '../../state/api/projects-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { ProjectPageToolbar } from './ProjectPageToolbar';
import { ProjectSummaryCard } from './components/ProjectSummaryCard';
import { ProjectContactsCard } from './components/ProjectContactsCard';
import { ProjectResourceLinksCard } from './components/ProjectResourceLinksCard';
import { ProjectOwnershipCard } from './components/ProjectOwnershipCard';

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
      <ProjectPageToolbar
        projectName={project.summary.name}
        domainId={domainId}
        projectId={projectId}
      />

      <Box height={'100%'} width={'100%'} overflowY={'auto'}>
        <Flex p={4} gap={4} width={'100%'} direction={'column'}>
          <Heading width={'100%'} size={'md'} fontWeight={'regular'}>
            {project.summary.name}
          </Heading>

          <ProjectSummaryCard
            domainId={domainId}
            projectId={projectId}
            technologies={project.summary.technologies}
            description={project.summary.description}
            onDescriptionChange={async () => {
              await refetch();
            }}
          />

          <ProjectOwnershipCard
            domainId={domainId}
            projectName={project.summary.name}
            projectId={projectId}
            ownership={project.ownership}
          />

          <ProjectContactsCard
            domainId={domainId}
            projectName={project.summary.name}
            projectId={projectId}
            contacts={project.contacts}
            onAddContacts={async () => {
              await refetch();
            }}
          />

          <ProjectResourceLinksCard
            domainId={domainId}
            projectName={project.summary.name}
            projectId={projectId}
            links={project.resourceLinks}
            onAddLink={async () => {
              await refetch();
            }}
          />
        </Flex>
      </Box>
    </Flex>
  );
};
