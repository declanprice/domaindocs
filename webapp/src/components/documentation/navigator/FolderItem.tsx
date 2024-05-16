import { Badge, Box, Flex, IconButton, StyleProps, Text } from '@chakra-ui/react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { useHover } from '@uidotdev/usehooks';

export type DocumentationFolderItemProps = {
    activeDocumentationId?: string;
    onDocumentationClick: (documentationId: string) => any;
    documentationId: string;
    itemName: string;
    parentFolderRef?: any;
} & StyleProps;

export const FolderItem = (props: DocumentationFolderItemProps) => {
    const { itemName, onDocumentationClick, activeDocumentationId, documentationId } = props;

    const [ref, hovering] = useHover();

    return (
        <Flex
            {...props}
            alignItems="center"
            gap={2}
            p={2}
            ref={ref}
            backgroundColor={documentationId === activeDocumentationId ? 'hover' : undefined}
            _hover={{ backgroundColor: 'hover', cursor: 'pointer' }}
            position={'relative'}
            onClick={() => {
                onDocumentationClick(documentationId);
            }}
        >
            <Box ml={`${props?.parentFolderRef?.current?.offsetLeft + 4}px`}>
                <Badge fontSize={8} colorScheme={'blue'}>
                    File
                </Badge>
            </Box>

            <Flex width="100%" alignItems="center">
                <Text fontSize={12}>{itemName}</Text>

                <Flex position={'absolute'} right={0} mr={2} gap={1} hidden={!hovering}>
                    <IconButton
                        colorScheme={'gray'}
                        size={'xs'}
                        aria-label={'folder-menu'}
                        icon={<HiOutlineDotsHorizontal />}
                    ></IconButton>
                </Flex>
            </Flex>
        </Flex>
    );
};
