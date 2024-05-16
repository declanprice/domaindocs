import { Documentation, DocumentationType } from '@domaindocs/lib';
import { Box, Flex, IconButton, List, styled, StyleProps, Text } from '@chakra-ui/react';
import { IoFolderOutline } from 'react-icons/io5';
import { IoMdAdd } from 'react-icons/io';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { useHover } from '@uidotdev/usehooks';
import { useRef, useState } from 'react';
import { FolderItem } from './FolderItem';

export type DocsFolderProps = {
    activeDocumentationId?: string;
    documentationId: string;
    folderName: string;
    folderSubtitle?: string;
    folderItems: Documentation[] | null;
    parentFolderRef?: any;
    onAddFile: (documentationId: string) => any;
    onDocumentationClick: (documentationId: string) => any;
} & StyleProps;

export const Folder = styled((props: DocsFolderProps) => {
    const [isFolderOpen, setIsFolderOpen] = useState<boolean>(false);

    const folderRef = useRef(null);

    const [ref, hovering] = useHover();

    const {
        folderName,
        folderSubtitle,
        folderItems,
        onAddFile,
        documentationId,
        onDocumentationClick,
        activeDocumentationId,
    } = props;

    return (
        <Flex direction="column" {...props}>
            <Flex
                alignItems="center"
                ref={ref}
                gap={2}
                p={2}
                _hover={{ backgroundColor: 'hover', cursor: 'pointer' }}
                position={'relative'}
            >
                <Box
                    ref={folderRef}
                    ml={props?.parentFolderRef ? `${props.parentFolderRef.current.offsetLeft + 4}px` : undefined}
                    onClick={() => {
                        setIsFolderOpen(!isFolderOpen);
                    }}
                >
                    <IoFolderOutline fontSize={14} />
                </Box>

                <Flex
                    width="100%"
                    direction={'column'}
                    onClick={() => {
                        setIsFolderOpen(!isFolderOpen);
                    }}
                >
                    <Text fontSize={12}>{folderName}</Text>

                    {folderSubtitle && <Text fontSize={10}>{folderSubtitle}</Text>}
                </Flex>

                <Flex position={'absolute'} right={0} mr={2} gap={1} hidden={!hovering}>
                    <IconButton
                        colorScheme={'gray'}
                        size={'xs'}
                        aria-label={'folder-menu'}
                        icon={<HiOutlineDotsHorizontal />}
                    ></IconButton>

                    <IconButton
                        colorScheme={'gray'}
                        size={'xs'}
                        aria-label={'folder-menu'}
                        icon={<IoMdAdd />}
                        onClick={() => {
                            onAddFile(documentationId);
                        }}
                    ></IconButton>
                </Flex>
            </Flex>

            {isFolderOpen && (
                <List width={'100%'} height={'100%'}>
                    {folderItems?.map((item) => {
                        if (item.type === DocumentationType.FOLDER) {
                            return (
                                <Folder
                                    folderName={item.name}
                                    parentFolderRef={folderRef}
                                    folderItems={item.documentation}
                                    documentationId={item.documentationId}
                                    onAddFile={onAddFile}
                                    onDocumentationClick={onDocumentationClick}
                                    activeDocumentationId={activeDocumentationId}
                                />
                            );
                        } else {
                            return (
                                <FolderItem
                                    itemName={item.name}
                                    parentFolderRef={folderRef}
                                    onDocumentationClick={onDocumentationClick}
                                    documentationId={item.documentationId}
                                    activeDocumentationId={activeDocumentationId}
                                />
                            );
                        }
                    })}
                </List>
            )}
        </Flex>
    );
});
