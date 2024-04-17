import { Flex, Stack } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { DetailedProject } from '@domaindocs/lib';
import { DomainPageParams } from '../../types/DomainPageParams';
import { projectsApi } from '../../state/api/projects-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { TableToolbar } from '../../components/table/TableToolbar';
import { ProjectTable } from '../../components/project/ProjectTable';

export const ProjectsPage = () => {
  const { domainId } = useParams() as DomainPageParams;

  const navigate = useNavigate();

  const { data: projects, isLoading } = useQuery<DetailedProject[]>({
    queryKey: ['searchProjects', { domainId }],
    queryFn: () => projectsApi.searchProjects(domainId, {}),
  });

  if (!projects || isLoading) return <LoadingContainer />;

  return (
    <Flex p={4} gap={4} width={'100%'} direction={'column'}>
      <Stack>
        <TableToolbar
          title={`Projects (${projects.length})`}
          onSearch={() => {}}
          onFilterClick={() => {}}
        />

        <ProjectTable
          projects={projects}
          onProjectClick={(project: DetailedProject) => {
            navigate(`/${domainId}/projects/${project.project.projectId}`);
          }}
        />
      </Stack>
    </Flex>
  );
};
