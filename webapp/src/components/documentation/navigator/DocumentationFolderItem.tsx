import { Badge, Box, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, StyleProps, Text } from '@chakra-ui/react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { useHover } from '@uidotdev/usehooks';
import { Documentation, DocumentationType } from '@domaindocs/lib';
import { MdAttachFile, MdOutlineDeleteOutline } from 'react-icons/md';
import { IoDocumentTextOutline } from 'react-icons/io5';

export type DocumentationFolderItemProps = {
    documentation: Documentation;
    activeDocumentation?: Documentation;
    onDocumentationClick: (documentation: Documentation) => any;
    parentFolderRef?: any;
} & StyleProps;

export const DocumentationFolderItem = (props: DocumentationFolderItemProps) => {
    const { documentation, onDocumentationClick, activeDocumentation } = props;

    const [ref, hovering] = useHover();

    return (
        <Flex
            {...props}
            alignItems="center"
            gap={2}
            p={3}
            ref={ref}
            backgroundColor={
                documentation.documentationId === activeDocumentation?.documentationId ? 'hover' : undefined
            }
            _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
            position={'relative'}
            onClick={() => {
                onDocumentationClick(documentation);
            }}
        >
            <Box ml={`${props?.parentFolderRef?.current?.offsetLeft + 4}px`}>
                {documentation.type === DocumentationType.FILE && <MdAttachFile />}
                {documentation.type === DocumentationType.DOCUMENT && <IoDocumentTextOutline />}
            </Box>

            <Flex width="100%" alignItems="center">
                <Text fontSize={12}>{documentation.name}</Text>

                <Flex position={'absolute'} right={0} mr={2} gap={1} hidden={!hovering}>
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
                            <MenuItem>
                                <Flex width={'100%'} alignItems={'center'} p={1}>
                                    <MdOutlineDeleteOutline />
                                    <Text fontSize={12} ml={1}>
                                        Remove {documentation.type}
                                    </Text>
                                </Flex>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>
        </Flex>
    );
};
