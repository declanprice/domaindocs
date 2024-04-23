import { Box, Flex, Stack } from '@chakra-ui/react';
import { SubdomainPageToolbar } from './SubdomainPageToolbar';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { TableToolbar } from '../../components/table/TableToolbar';
import { ProjectTable } from '../../components/project/ProjectTable';
import { DetailedProject } from '@domaindocs/lib';
import { useQuery } from '@tanstack/react-query';
import { projectsApi } from '../../state/api/projects-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { SubdomainPageParams } from './SubdomainPageParams';

export const SubdomainProjectsPage = () => {
    const { domainId, subdomainId } = useParams() as SubdomainPageParams;

    const navigate = useNavigate();

    const { data: projects, isLoading } = useQuery<DetailedProject[]>({
        queryKey: ['searchProjects', { domainId, subdomainId }],
        queryFn: () => projectsApi.searchProjects(domainId, { subdomainId }),
    });

    if (!projects || isLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" width={'100%'}>
            <SubdomainPageToolbar />

            <Box height={'100%'} width={'100%'} overflowY={'auto'}>
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
            </Box>
        </Flex>
    );
};
