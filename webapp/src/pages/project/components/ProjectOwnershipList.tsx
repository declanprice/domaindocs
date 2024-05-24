import {
    isPersonOwnership,
    isTeamOwnership,
    ProjectOwnership as ProjectOwnershipData,
    ProjectPersonOwnership,
    ProjectTeamOwnership,
} from '@domaindocs/lib';
import {
    Box,
    Flex,
    IconButton,
    List,
    ListItem,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { AddIconButton } from '../../../components/buttons/AddIconButton';
import { PersonAvatar } from '../../../components/person/PersonAvatar';
import { TbDots } from 'react-icons/tb';
import { useHover } from '@uidotdev/usehooks';
import { ConfirmDialog } from '../../../components/dialogs/ConfirmDialog';
import { DefaultError, useMutation } from '@tanstack/react-query';
import { projectsApi } from '../../../state/api/projects-api';
import { AddTeamOwnership } from './AddTeamOwnership';
import { AddPersonOwnership } from './AddPersonOwnership';
import React from 'react';
import { TeamAvatar } from '../../../components/team/TeamAvatar';

type ProjectOwnershipProps = {
    domainId: string;
    projectId: string;
    projectName: string;
    ownership: ProjectOwnershipData[];
    onAddTeamOwnership: () => void;
    onAddPersonOwnership: () => void;
    onRemoveOwnership: () => void;
};

export const ProjectOwnershipList = (props: ProjectOwnershipProps) => {
    const { domainId, projectId, projectName, ownership, onAddTeamOwnership, onAddPersonOwnership, onRemoveOwnership } =
        props;

    const addTeamOwnership = useDisclosure();
    const addPersonOwnership = useDisclosure();

    const { mutateAsync: removeOwnership } = useMutation<void, DefaultError, string>({
        mutationKey: ['removeProjectOwnership', { domainId, projectId }],
        mutationFn: async (ownershipId: string) => {
            return projectsApi.removeOwnership(domainId, projectId, ownershipId);
        },
    });

    return (
        <Flex direction={'column'} gap={1}>
            <Flex>
                <Text fontSize={16}>Ownership</Text>

                <Menu>
                    <MenuButton as={AddIconButton} marginLeft={'auto'} />

                    <MenuList>
                        <MenuItem onClick={addPersonOwnership.onOpen}>Person</MenuItem>
                        <MenuItem onClick={addTeamOwnership.onOpen}>Team</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>

            <List spacing={4}>
                {ownership.map((o) => {
                    if (isPersonOwnership(o)) {
                        return (
                            <PersonOwnershipItem
                                ownership={o}
                                onRemove={async () => {
                                    await removeOwnership(o.ownershipId);
                                    onRemoveOwnership();
                                }}
                            />
                        );
                    }

                    if (isTeamOwnership(o)) {
                        return (
                            <TeamOwnershipItem
                                ownership={o}
                                onRemove={async () => {
                                    await removeOwnership(o.ownershipId);
                                    onRemoveOwnership();
                                }}
                            />
                        );
                    }
                })}
            </List>

            <AddTeamOwnership
                isOpen={addTeamOwnership.isOpen}
                domainId={domainId}
                projectId={projectId}
                ownership={ownership}
                onClose={addTeamOwnership.onClose}
                onSubmit={onAddTeamOwnership}
            />

            <AddPersonOwnership
                isOpen={addPersonOwnership.isOpen}
                domainId={domainId}
                projectId={projectId}
                ownership={ownership}
                onClose={addPersonOwnership.onClose}
                onSubmit={onAddPersonOwnership}
            />
        </Flex>
    );
};

const PersonOwnershipItem = (props: {
    ownership: ProjectPersonOwnership;
    onRemove: (ownership: ProjectPersonOwnership) => void;
}) => {
    const { ownership, onRemove } = props;

    const [ref, hovering] = useHover();

    const removeOwnershipDialog = useDisclosure();

    return (
        <ListItem key={ownership.userId} ref={ref} p={1} rounded={6}>
            <Flex alignItems={'center'}>
                <PersonAvatar
                    {...ownership}
                    displayRoles={false}
                    subTitle={<Text fontSize={10}>{ownership.description}</Text>}
                    small
                />

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

const TeamOwnershipItem = (props: {
    ownership: ProjectTeamOwnership;
    onRemove: (ownership: ProjectTeamOwnership) => void;
}) => {
    const { ownership, onRemove } = props;

    const [ref, hovering] = useHover();

    const removeOwnershipDialog = useDisclosure();

    return (
        <ListItem key={ownership.teamId} ref={ref} p={1} rounded={6}>
            <Flex alignItems={'center'}>
                <TeamAvatar name={ownership.name} subTitle={ownership.description} small />

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
