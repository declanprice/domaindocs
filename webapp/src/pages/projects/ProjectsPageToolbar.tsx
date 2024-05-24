import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import { TbUsersGroup } from 'react-icons/tb';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { CreateProjectData, DetailedTeam } from '@domaindocs/lib';
import { teamsApi } from '../../state/api/teams-api';
import { queryClient } from '../../state/query-client';
import { projectsApi } from '../../state/api/projects-api';
import { CreateProjectDialog } from './components/CreateProjectDialog';
import { DomainPageParams } from '../../types/DomainPageParams';
import { PageToolbar } from '../../components/page/PageToolbar';

export const ProjectsPageToolbar = () => {
    const { domainId } = useParams() as DomainPageParams;

    const createProjectDialog = useDisclosure();

    const { data: teams } = useQuery<DetailedTeam[]>({
        queryKey: ['searchTeams', { domainId }],
        queryFn: () => teamsApi.search(domainId),
    });

    const { mutateAsync: createProject } = useMutation({
        mutationKey: ['createProject', { domainId }],
        mutationFn: async (data: CreateProjectData) => {
            await projectsApi.createProject(domainId, data);

            await queryClient.invalidateQueries({
                queryKey: ['searchProjects', { domainId }],
            });
        },
    });

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
                onProjectCreate={async (project) => {
                    await createProject(project);
                }}
            />
        </>
    );
};
