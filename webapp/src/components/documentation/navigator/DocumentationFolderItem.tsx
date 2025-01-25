import { Box, Flex, IconButton, ListItem, Menu, MenuItem, MenuTrigger, Text } from '@chakra-ui/react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { useHover } from '@uidotdev/usehooks';
import { Documentation, DocumentationType } from '@domaindocs/types';
import { MdAttachFile, MdOutlineDeleteOutline } from 'react-icons/md';
import { IoDocumentTextOutline } from 'react-icons/io5';

export type DocumentationFolderItemProps = {
    documentation: Documentation;
    activeDocumentation?: Documentation;
    onRemoveDocumentation?: (documentation: Documentation) => any;
    onDocumentationClick?: (documentation: Documentation) => any;
    parentFolderRef?: any;
    readonly?: boolean;
};

export const DocumentationFolderItem = (props: DocumentationFolderItemProps) => {
    const { documentation, readonly, onDocumentationClick, onRemoveDocumentation, activeDocumentation } = props;

    const [ref, hovering] = useHover();

    return (
        <ListItem
            display={'flex'}
            alignItems="center"
            gap={2}
            p={3}
            ref={ref}
            rounded={6}
            backgroundColor={
                documentation.documentationId == activeDocumentation?.documentationId ? 'gray.100' : undefined
            }
            _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
            position={'relative'}
            onClick={() => {
                if (onDocumentationClick) {
                    onDocumentationClick(documentation);
                }
            }}
            {...props}
        >
            <Box ml={`${props?.parentFolderRef?.current?.offsetLeft + 4}px`}>
                {documentation.type === DocumentationType.FILE && <MdAttachFile />}
                {documentation.type === DocumentationType.DOCUMENT && <IoDocumentTextOutline />}
            </Box>

            <Flex width="100%" alignItems="center">
                <Text fontSize={12}>{documentation.name}</Text>

                {props.readonly !== true && (
                    <Flex position={'absolute'} right={0} mr={2} gap={1} hidden={!hovering}>
                        <Menu.Root>
                            <MenuTrigger>
                                <IconButton
                                    colorScheme={'gray'}
                                    variant={'ghost'}
                                    size={'xs'}
                                    aria-label={'folder-menu'}
                                >
                                    <HiOutlineDotsHorizontal />
                                </IconButton>
                            </MenuTrigger>

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
                                        Remove {documentation.type}
                                    </Text>
                                </Flex>
                            </MenuItem>
                        </Menu.Root>
                    </Flex>
                )}
            </Flex>
        </ListItem>
    );
};
