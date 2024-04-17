import { Documentation } from '@domaindocs/lib';
import {
  Avatar,
  Box,
  Divider,
  Flex,
  IconButton,
  List,
  styled,
  StyleProps,
  Text,
} from '@chakra-ui/react';
import { IoFolderOutline } from 'react-icons/io5';
import { IoMdAdd } from 'react-icons/io';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { DocumentationFolderItem } from './DocumentationFolderItem';
import { useHover } from '@uidotdev/usehooks';
import { useRef, useState } from 'react';
export type DocumentationFolderProps = {
  documentation: Documentation;
  parentFolderRef?: any;
} & StyleProps;

export const DocumentationFolder = styled((props: DocumentationFolderProps) => {
  const [isFolderOpen, setIsFolderOpen] = useState<boolean>(false);

  const folderRef = useRef(null);

  const [ref, hovering] = useHover();

  const { documentation } = props;

  return (
    <Flex direction="column" {...props}>
      <Flex
        alignItems="center"
        ref={ref}
        gap={2}
        p={2}
        _hover={{ backgroundColor: 'lightgray', cursor: 'pointer' }}
        position={'relative'}
        onClick={() => {
          setIsFolderOpen(!isFolderOpen);
        }}
      >
        <Box
          ref={folderRef}
          ml={
            props?.parentFolderRef
              ? `${props.parentFolderRef.current.offsetLeft + 4}px`
              : undefined
          }
        >
          <IoFolderOutline fontSize={14} />
        </Box>

        <Flex width="100%" direction={'column'}>
          <Text fontSize={12}>{documentation.name}</Text>

          {documentation.category && (
            <Text fontSize={10}>{documentation.category}</Text>
          )}
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
          ></IconButton>
        </Flex>
      </Flex>

      {isFolderOpen && (
        <List width={'100%'} height={'100%'}>
          {documentation.documentation.map((doc) => {
            if (doc.isFolder) {
              return (
                <DocumentationFolder
                  parentFolderRef={folderRef}
                  documentation={doc}
                />
              );
            }

            return (
              <DocumentationFolderItem
                parentFolderRef={folderRef}
                documentation={doc}
              />
            );
          })}
        </List>
      )}
    </Flex>
  );
});
