import { Flex, Stack } from '@chakra-ui/react'
import { TableToolbar } from '@components/table/TableToolbar.tsx'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { LoadingContainer } from '@components/loading/LoadingContainer.tsx'
import { DomainPageParams } from '@types/DomainPageParams.tsx'
import { projectsApi } from '@state/api/projects-api.ts'
import { ProjectTable } from '@components/project/ProjectTable.tsx'
import { DetailedProjectDto } from 'lib'

export const ProjectsPage = () => {
    const { domainId } = useParams() as DomainPageParams

    const { data: projects, isLoading } = useQuery<DetailedProjectDto[]>({
        queryKey: ['searchProjects', { domainId }],
        queryFn: () => projectsApi.searchProjects(domainId, {}),
    })

    if (!projects || isLoading) return <LoadingContainer />

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
                    onProjectClick={() => {
                        // navigate
                    }}
                />
            </Stack>
        </Flex>
    )
}
