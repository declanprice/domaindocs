import { Documentation, DocumentationType } from '@domaindocs/types';
import {
    Flex,
    IconButton,
    List,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    styled,
    StyleProps,
    Text,
} from '@chakra-ui/react';
import { useHover } from '@uidotdev/usehooks';
import { useRef, useState } from 'react';
import { DocumentationFolderItem } from './DocumentationFolderItem';
import { FaRegFolderOpen } from 'react-icons/fa';
import { FaRegFolderClosed } from 'react-icons/fa6';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { MdAttachFile, MdOutlineDeleteOutline } from 'react-icons/md';

export type DocumentationFolderProps = {
    documentation: Documentation;
    activeDocumentation?: Documentation;
    parentFolderRef?: any;
    onAddFile?: (documentation: Documentation) => any;
    onAddDocument?: (documentation: Documentation) => any;
    onAddFolder?: (documentation: Documentation) => any;
    onRemoveDocumentation?: (documentation: Documentation) => any;
    onDocumentationClick?: (documentation: Documentation) => any;
    readonly?: boolean;
} & StyleProps;

export const DocumentationFolder = styled((props: DocumentationFolderProps) => {
    const {
        documentation,
        onAddFile,
        onRemoveDocumentation,
        onAddFolder,
        onAddDocument,
        onDocumentationClick,
        activeDocumentation,
    } = props;

    const [isFolderOpen, setIsFolderOpen] = useState<boolean>(false);

    const folderRef = useRef(null);

    const [ref, hovering] = useHover();

    return (
        <Flex direction="column" {...props}>
            <Flex
                alignItems="center"
                ref={ref}
                gap={2}
                p={2}
                _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                position={'relative'}
            >
                <IconButton
                    aria-label={'toggle-folder'}
                    icon={isFolderOpen ? <FaRegFolderOpen /> : <FaRegFolderClosed />}
                    variant={'ghost'}
                    ref={folderRef}
                    ml={props?.parentFolderRef ? `${props.parentFolderRef.current.offsetLeft + 4}px` : undefined}
                    onClick={() => {
                        setIsFolderOpen(!isFolderOpen);
                    }}
                    size={'xs'}
                />

                <Flex
                    width="100%"
                    direction={'column'}
                    onClick={() => {
                        setIsFolderOpen(!isFolderOpen);
                    }}
                >
                    <Text fontSize={12}>{documentation.name}</Text>
                </Flex>

                {props.readonly !== true && (
                    <Flex mr={2} gap={1} hidden={!hovering}>
                        <Menu>
                            <MenuButton>
                                <IconButton
                                    colorScheme={'gray'}
                                    size={'xs'}
                                    aria-label={'folder-menu'}
                                    icon={<HiOutlineDotsHorizontal />}
                                ></IconButton>
                            </MenuButton>

                            <MenuList>
                                {documentation.type !== DocumentationType.FOLDER && (
                                    <MenuItem>
                                        <Flex width={'100%'} alignItems={'center'} p={1}>
                                            <FaRegFolderClosed />
                                            <Text
                                                fontSize={12}
                                                flex={1}
                                                ml={1}
                                                onClick={() => {
                                                    if (onAddFolder) {
                                                        onAddFolder(documentation);
                                                    }
                                                }}
                                            >
                                                Create Folder
                                            </Text>
                                        </Flex>
                                    </MenuItem>
                                )}

                                <MenuItem>
                                    <Flex width={'100%'} alignItems={'center'} p={1}>
                                        <MdAttachFile />
                                        <Text
                                            fontSize={12}
                                            flex={1}
                                            ml={1}
                                            onClick={() => {
                                                if (onAddFile) {
                                                    onAddFile(documentation);
                                                }
                                            }}
                                        >
                                            Create File
                                        </Text>
                                    </Flex>
                                </MenuItem>

                                <MenuItem>
                                    <Flex width={'100%'} alignItems={'center'} p={1}>
                                        <IoDocumentTextOutline />
                                        <Text
                                            fontSize={12}
                                            flex={1}
                                            ml={1}
                                            onClick={() => {
                                                if (onAddDocument) {
                                                    onAddDocument(documentation);
                                                }
                                            }}
                                        >
                                            Create Document
                                        </Text>
                                    </Flex>
                                </MenuItem>

                                {documentation.type === DocumentationType.FOLDER && (
                                    <MenuItem>
                                        <Flex width={'100%'} alignItems={'center'} p={1}>
                                            <MdOutlineDeleteOutline />
                                            <Text
                                                fontSize={12}
                                                ml={1}
                                                onClick={() => {
                                                    if (onRemoveDocumentation) {
                                                        onRemoveDocumentation(documentation);
                                                    }
                                                }}
                                            >
                                                Remove Folder
                                            </Text>
                                        </Flex>
                                    </MenuItem>
                                )}
                            </MenuList>
                        </Menu>
                    </Flex>
                )}
            </Flex>

            {isFolderOpen && (
                <List width={'100%'} height={'100%'}>
                    {documentation?.documentation?.map((doc) => {
                        if (doc.type == DocumentationType.FOLDER) {
                            return (
                                <DocumentationFolder
                                    readonly={props.readonly}
                                    documentation={doc}
                                    parentFolderRef={folderRef}
                                    onAddFile={onAddFile}
                                    onAddDocument={onAddDocument}
                                    onAddFolder={onAddFolder}
                                    onRemoveDocumentation={onRemoveDocumentation}
                                    onDocumentationClick={onDocumentationClick}
                                    activeDocumentation={activeDocumentation}
                                />
                            );
                        } else {
                            return (
                                <DocumentationFolderItem
                                    readonly={props.readonly}
                                    documentation={doc}
                                    parentFolderRef={folderRef}
                                    onDocumentationClick={onDocumentationClick}
                                    onRemoveDocumentation={onRemoveDocumentation}
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
