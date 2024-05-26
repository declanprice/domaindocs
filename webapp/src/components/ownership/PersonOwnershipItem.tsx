import { ProjectPersonOwnership } from '@domaindocs/types';
import { useHover } from '@uidotdev/usehooks';
import {
    Box,
    Flex,
    IconButton,
    ListItem,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { PersonAvatar } from '../person/PersonAvatar';
import { TbDots } from 'react-icons/tb';
import { ConfirmDialog } from '../dialogs/ConfirmDialog';
import React from 'react';

export const PersonOwnershipItem = (props: {
    ownership: ProjectPersonOwnership;
    onRemove: (ownership: ProjectPersonOwnership) => void;
}) => {
    const { ownership, onRemove } = props;

    const [ref, hovering] = useHover();

    const removeOwnershipDialog = useDisclosure();

    return (
        <ListItem key={ownership.userId} ref={ref} p={1} rounded={6}>
            <Flex alignItems={'center'}>
                <PersonAvatar {...ownership} subTitle={<Text fontSize={10}>{ownership.description}</Text>} small />

                <Box flex={1}></Box>

                {hovering && (
                    <Menu>
                        <MenuButton size={'xs'} as={IconButton} icon={<TbDots />} />

                        <MenuList>
                            <MenuItem onClick={removeOwnershipDialog.onOpen}>Remove</MenuItem>
                        </MenuList>
                    </Menu>
                )}

                <ConfirmDialog
                    isOpen={removeOwnershipDialog.isOpen}
                    header={'Remove Ownership'}
                    onConfirm={() => onRemove(ownership)}
                    onCancel={removeOwnershipDialog.onClose}
                />
            </Flex>
        </ListItem>
    );
};
