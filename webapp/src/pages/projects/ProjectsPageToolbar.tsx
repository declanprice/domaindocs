import { PageToolbar } from '@components/page/PageToolbar.tsx'
import { Flex, Text, useDisclosure } from '@chakra-ui/react'
import { TbUsersGroup } from 'react-icons/tb'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { DomainPageParams } from '@types/DomainPageParams.tsx'
import { DetailedTeam, teamsApi } from '@state/api/teams-api.ts'
import { queryClient } from '@state/query-client.ts'
import { CreateProjectDialog } from '@components/project/CreateProjectDialog.tsx'
import { projectsApi } from '@state/api/projects-api.ts'
import { CreateProjectDto } from 'lib'

export const ProjectsPageToolbar = () => {
    const { domainId } = useParams() as DomainPageParams

    const createProjectDialog = useDisclosure()

    const { data: teams } = useQuery<DetailedTeam[]>({
        queryKey: ['searchTeams', { domainId }],
        queryFn: () => teamsApi.searchTeams(domainId),
    })

    const { mutateAsync: createProject } = useMutation({
        mutationKey: ['createProject', { domainId }],
        mutationFn: async (data: CreateProjectDto) => {
            await projectsApi.createProject(domainId, data)

            await queryClient.invalidateQueries({
                queryKey: ['searchProjects', { domainId }],
            })
        },
    })

    return (
        <>
            <PageToolbar
                title={
                    <Flex alignItems={'center'}>
                        <TbUsersGroup color={'gray.900'} size={14} />
                        <Text ml={2} fontSize={12}>
                            Projects
                        </Text>
                    </Flex>
                }
                actions={[
                    {
                        label: 'New Project',
                        onClick: createProjectDialog.onOpen,
                    },
                ]}
            />

            <CreateProjectDialog
                isOpen={createProjectDialog.isOpen}
                onClose={createProjectDialog.onClose}
                teams={teams?.map((t) => t.team) || []}
                onProjectCreate={async (project) => {
                    await createProject(project)
                }}
            />
        </>
    )
}
