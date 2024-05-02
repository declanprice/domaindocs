import { Box, Flex, Wrap, WrapItem } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { File, ProjectOverview } from '@domaindocs/lib';

import { ProjectPageParams } from './ProjectPageParams';
import { projectsApi } from '../../state/api/projects-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { ProjectPageToolbar } from './ProjectPageToolbar';
import { TableToolbar } from '../../components/table/TableToolbar';
import { filesApi } from '../../state/api/files-api';
import { FileTable } from '../../components/file/FileTable';

export const ProjectFilesPage = () => {
    const { domainId, projectId } = useParams() as ProjectPageParams;

    const { data: project, isLoading } = useQuery<ProjectOverview>({
        queryKey: ['projectOverview', { domainId, projectId }],
        queryFn: () => projectsApi.getProjectOverview(domainId, projectId),
    });

    const { data: files, isLoading: isLoadingFiles } = useQuery<File[]>({
        queryKey: ['searchFiles', { domainId, projectId }],
        queryFn: () => filesApi.searchFiles(domainId, { projectId }),
    });

    if (!project || isLoading || !files || isLoadingFiles) return <LoadingContainer />;

    return (
        <Flex direction="column" width={'100%'}>
            <ProjectPageToolbar projectName={project.description} domainId={domainId} projectId={projectId} />

            <Box height={'100%'} width={'100%'} overflowY={'auto'}>
                <Flex p={4} gap={4} width={'100%'} direction={'column'}>
                    <TableToolbar title={`Files (${files.length})`} onSearch={() => {}} onFilterClick={() => {}} />

                    <FileTable files={files} onFileClick={(file: File) => {}} />
                </Flex>
            </Box>
        </Flex>
    );
};
