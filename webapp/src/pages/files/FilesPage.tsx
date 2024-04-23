import { Box, Flex, Stack, Wrap, WrapItem } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { File } from '@domaindocs/lib';
import { DomainPageParams } from '../../types/DomainPageParams';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { FilesPageToolbar } from './FilesPageToolbar';
import { filesApi } from '../../state/api/files-api';
import { FileCard } from '../../components/file/FileCard';
import { TableToolbar } from '../../components/table/TableToolbar';

export const FilesPage = () => {
    const { domainId } = useParams() as DomainPageParams;

    const navigate = useNavigate();

    const { data: files, isLoading } = useQuery<File[]>({
        queryKey: ['searchFiles', { domainId }],
        queryFn: () => filesApi.searchFiles(domainId, {}),
    });

    if (!files || isLoading) return <LoadingContainer />;

    return (
        <Flex direction="column" width={'100%'}>
            <FilesPageToolbar domainId={domainId} />

            <Box height={'100%'} width={'100%'} overflowY={'auto'}>
                <Flex p={4} gap={4} width={'100%'} direction={'column'}>
                    <TableToolbar title={`Files (${files.length})`} onSearch={() => {}} onFilterClick={() => {}} />

                    <Wrap spacing={4}>
                        {files.map((file: File) => (
                            <>
                                <WrapItem>
                                    <FileCard file={file} />
                                </WrapItem>
                            </>
                        ))}
                    </Wrap>
                </Flex>
            </Box>
        </Flex>
    );
};
