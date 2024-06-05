import { Documentation, DocumentationType } from '@domaindocs/types';
import {
    Flex,
    IconButton,
    List,
    ListItem,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Stack,
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
import { GoPeople } from 'react-icons/go';
import { BiNetworkChart } from 'react-icons/bi';

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
    renderFolder?: (documentation: Documentation, onOpen: () => any) => any;
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

    const renderFolder = () => {
        if (documentation.type === DocumentationType.DOMAIN_ROOT_FOLDER) {
            return (
                <Flex
                    width={'100%'}
                    gap={2}
                    alignItems="center"
                    onClick={() => {
                        setIsFolderOpen(!isFolderOpen);
                    }}
                >
                    <Flex alignItems={'center'} backgroundColor={'blue.700'} rounded={6} p={1}>
                        <BiNetworkChart color={'white'} />
                    </Flex>

                    <Stack spacing={0}>
                        <Text color={'gray.900'} fontSize={12} fontWeight={'400'}>
                            {documentation.name}
                        </Text>

                        <Text color={'gray.900'} fontSize={10} fontWeight={'300'}>
                            Domain
                        </Text>
                    </Stack>
                </Flex>
            );
        }

        if (documentation.type === DocumentationType.TEAM_ROOT_FOLDER) {
            return (
                <Flex
                    width={'100%'}
                    gap={2}
                    alignItems="center"
                    onClick={() => {
                        setIsFolderOpen(!isFolderOpen);
                    }}
                >
                    <Flex alignItems={'center'} backgroundColor={'purple.400'} rounded={6} p={1}>
                        <GoPeople color={'white'} />
                    </Flex>

                    <Stack spacing={0}>
                        <Text color={'gray.900'} fontSize={12} fontWeight={'400'}>
                            {documentation.name}
                        </Text>

                        <Text color={'gray.900'} fontSize={10} fontWeight={'300'}>
                            Team
                        </Text>
                    </Stack>
                </Flex>
            );
        }

        if (documentation.type === DocumentationType.PROJECT_ROOT_FOLDER) {
            return (
                <Flex
                    width={'100%'}
                    gap={2}
                    alignItems="center"
                    onClick={() => {
                        setIsFolderOpen(!isFolderOpen);
                    }}
                >
                    <Flex alignItems={'center'} backgroundColor={'teal.400'} rounded={6} p={1}>
                        <BiNetworkChart color={'white'} />
                    </Flex>

                    <Stack spacing={0}>
                        <Text color={'gray.900'} fontSize={12} fontWeight={'400'}>
                            {documentation.name}
                        </Text>

                        <Text color={'gray.900'} fontSize={10} fontWeight={'300'}>
                            Component
                        </Text>
                    </Stack>
                </Flex>
            );
        }

        return (
            <Flex
                width={'100%'}
                ref={folderRef}
                onClick={() => {
                    setIsFolderOpen(!isFolderOpen);
                }}
                alignItems={'center'}
                gap={2}
            >
                <IconButton
                    aria-label={'toggle-folder'}
                    icon={isFolderOpen ? <FaRegFolderOpen /> : <FaRegFolderClosed />}
                    variant={'ghost'}
                    ml={props?.parentFolderRef ? `${props.parentFolderRef?.current?.offsetLeft + 2}px` : undefined}
                    size={'xs'}
                />

                <Flex width="100%" direction={'column'}>
                    <Text fontSize={12}>{documentation.name}</Text>
                </Flex>
            </Flex>
        );
    };

    return (
        <ListItem display={'flex'} flexDirection="column" {...props}>
            <Flex
                alignItems="center"
                ref={ref}
                gap={2}
                p={2}
                rounded={6}
                _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                position={'relative'}
            >
                {renderFolder()}

                {props.readonly !== true && (
                    <Flex gap={1} hidden={!hovering}>
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
                <List width={'100%'} height={'100%'} spacing={1}>
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
        </ListItem>
    );
});
