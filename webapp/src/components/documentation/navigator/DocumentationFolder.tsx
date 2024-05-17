import { Documentation, DocumentationType } from '@domaindocs/lib';
import { Box, Flex, IconButton, List, styled, StyleProps, Text } from '@chakra-ui/react';
import { IoFolderOutline } from 'react-icons/io5';
import { IoMdAdd } from 'react-icons/io';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { useHover } from '@uidotdev/usehooks';
import { useRef, useState } from 'react';
import { DocumentationFolderItem } from './DocumentationFolderItem';

export type DocumentationFolderProps = {
    documentation: Documentation;
    activeDocumentation?: Documentation;
    parentFolderRef?: any;
    onAddFile: (documentation: Documentation) => any;
    onDocumentationClick: (documentation: Documentation) => any;
} & StyleProps;

export const DocumentationFolder = styled((props: DocumentationFolderProps) => {
    const [isFolderOpen, setIsFolderOpen] = useState<boolean>(false);

    const folderRef = useRef(null);

    const [ref, hovering] = useHover();

    const { documentation, onAddFile, onDocumentationClick, activeDocumentation } = props;

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
                    <Text fontSize={12}>{documentation.name}</Text>

                    <Text fontSize={10}>{documentation.type}</Text>
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
                            onAddFile(documentation);
                        }}
                    ></IconButton>
                </Flex>
            </Flex>

            {isFolderOpen && (
                <List width={'100%'} height={'100%'}>
                    {documentation?.documentation?.map((doc) => {
                        if (documentation.type === DocumentationType.FOLDER) {
                            return (
                                <DocumentationFolder
                                    documentation={doc}
                                    parentFolderRef={folderRef}
                                    onAddFile={onAddFile}
                                    onDocumentationClick={onDocumentationClick}
                                    activeDocumentation={activeDocumentation}
                                />
                            );
                        } else {
                            return (
                                <DocumentationFolderItem
                                    documentation={doc}
                                    parentFolderRef={folderRef}
                                    onDocumentationClick={onDocumentationClick}
                                    activeDocumentation={activeDocumentation}
                                />
                            );
                        }
                    })}
                </List>
            )}
        </Flex>
    );
});
