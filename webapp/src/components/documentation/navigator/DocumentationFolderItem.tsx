import { Documentation } from '@domaindocs/lib';
import {
  Badge,
  Box,
  Flex,
  IconButton,
  StyleProps,
  Text,
} from '@chakra-ui/react';
import { IoFolderOutline } from 'react-icons/io5';
import { IoMdAdd } from 'react-icons/io';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { useHover } from '@uidotdev/usehooks';

export type DocumentationFolderItemProps = {
  documentation: Documentation;
} & StyleProps;

export const DocumentationFolderItem = (
  props: DocumentationFolderItemProps,
) => {
  const { documentation } = props;

  const [ref, hovering] = useHover();

  return (
    <Flex
      {...props}
      alignItems="center"
      gap={2}
      p={2}
      ref={ref}
      _hover={{ backgroundColor: 'lightgray', cursor: 'pointer' }}
      position={'relative'}
    >
      <Box ml={2}>
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
