import { Box, Flex } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { DetailedProject } from '@domaindocs/types';
import { DomainPageParams } from '../../types/DomainPageParams';
import { projectsApi } from '../../state/api/projects-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { TableToolbar } from '../../components/table/TableToolbar';
import { ProjectTable } from './components/ProjectTable';
import { ProjectsPageToolbar } from './ProjectsPageToolbar';

export const ProjectsPage = () => {
    const { domainId } = useParams() as DomainPageParams;

    const navigate = useNavigate();

    const { data: projects, isLoading } = useQuery<DetailedProject[]>({
        queryKey: ['searchProjects', { domainId }],
        queryFn: () => projectsApi.searchProjects(domainId, {}),
    });

    if (!projects || isLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" width={'100%'}>
            <ProjectsPageToolbar />

            <Box height={'100%'} width={'100%'} overflowY={'auto'}>
                <Flex p={4} width={'100%'} direction={'column'}>
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
                </Flex>
            </Box>
        </Flex>
    );
};
