import { Badge, Box, Flex, IconButton, StyleProps, Text } from '@chakra-ui/react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { useHover } from '@uidotdev/usehooks';
import { Documentation } from '@domaindocs/lib';

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
            p={2}
            ref={ref}
            backgroundColor={
                documentation.documentationId === activeDocumentation?.documentationId ? 'hover' : undefined
            }
            _hover={{ backgroundColor: 'hover', cursor: 'pointer' }}
            position={'relative'}
            onClick={() => {
                onDocumentationClick(documentation);
            }}
        >
            <Box ml={`${props?.parentFolderRef?.current?.offsetLeft + 4}px`}>
                <Badge fontSize={8} colorScheme={'blue'}>
                    File
                </Badge>
            </Box>

            <Flex width="100%" alignItems="center">
                <Text fontSize={12}>{documentation.name}</Text>

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