import { Button, Flex, Text } from '@chakra-ui/react';
import { FormTextInput } from '../../components/form/FormTextInput';
import { useParams } from 'react-router-dom';
import { ProjectPageParams } from './ProjectPageParams';
import { useQuery } from '@tanstack/react-query';
import { ProjectOverview } from '@domaindocs/types';
import { projectsApi } from '../../state/api/projects-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import React from 'react';
import { ProjectPageToolbar } from './ProjectPageToolbar';
import { useForm } from 'react-hook-form';

export const ProjectSettingsPage = () => {
    const { domainId, projectId } = useParams() as ProjectPageParams;

    const {
        data: project,
        isLoading,
        refetch,
    } = useQuery<ProjectOverview>({
        queryKey: ['projectOverview', { domainId, projectId }],
        queryFn: () => projectsApi.getProjectOverview(domainId, projectId),
    });

    const form = useForm({
        values: {
            name: project?.name,
        },
    });

    if (!project || isLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" width={'100%'}>
            <ProjectPageToolbar projectName={project.name} domainId={domainId} projectId={projectId} />

            <Flex gap={4} width={'100%'} direction={'column'} overflowY={'auto'}>
                <Flex borderBottom={'1px solid'} borderColor={'border'} pb={30} px={4} pt={6}>
                    <Flex width={'280px'} minWidth={'250px'} gap={4} direction={'column'} mr={20}>
                        <Text fontSize={16}>Details</Text>
                        <Text fontSize={12}>Simple Project Details</Text>
                    </Flex>

                    <Flex direction={'column'}>
                        <FormTextInput name={'name'} control={form.control} label={'Project Name'} />
                    </Flex>
                </Flex>

                <Flex borderBottom={'1px solid'} borderColor={'border'} pb={35} px={4} pt={6}>
                    <Flex width={'280px'} minWidth={'250px'} gap={4} direction={'column'} mr={20}>
                        <Text fontSize={16}>Danger Area</Text>
                        <Text fontSize={12}>
                            Warning deleting a project is irreversible, you will lose all data relating to{' '}
                            {project.name}
                        </Text>
                    </Flex>

                    <Flex direction={'column'}>
                        <Button colorScheme={'red'} size={'sm'}>
                            Delete Project
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};
