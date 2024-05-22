import {
    AddProjectOwnershipData,
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
import { TeamAvatar } from '../../../components/team/TeamAvatar';
import { TbDots } from 'react-icons/tb';
import { useHover } from '@uidotdev/usehooks';
import { ConfirmDialog } from '../../../components/dialogs/ConfirmDialog';
import { DefaultError, useMutation } from '@tanstack/react-query';
import { projectsApi } from '../../../state/api/projects-api';

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
    const { domainId, projectId, projectName, ownership, onRemoveOwnership } = props;

    const { mutateAsync: removeOwnership } = useMutation<void, DefaultError, string>({
        mutationKey: ['removeProjectOwnership', { domainId }],
        mutationFn: async (ownershipId: string) => {
            return projectsApi.removeOwnership(domainId, projectId, ownershipId);
        },
    });

    const renderPersonOwnership = (o: ProjectPersonOwnership) => {
        const [ref, hovering] = useHover();

        const removeOwnershipDialog = useDisclosure();

        return (
            <ListItem key={o.userId} ref={ref} _hover={{ backgroundColor: 'hover' }} p={1} rounded={6}>
                <Flex alignItems={'center'}>
                    <PersonAvatar
                        {...o}
                        displayRoles={false}
                        subTitle={<Text fontSize={10}>{o.description}</Text>}
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
                        onConfirm={async () => {
                            await removeOwnership(o.ownershipId);
                            onRemoveOwnership();
                        }}
                        onCancel={removeOwnershipDialog.onClose}
                    />
                </Flex>
            </ListItem>
        );
    };

    const renderTeamOwnership = (o: ProjectTeamOwnership) => {
        const [ref, hovering] = useHover();

        const removeOwnershipDialog = useDisclosure();

        return (
            <ListItem key={o.teamId} ref={ref} _hover={{ backgroundColor: 'hover' }} p={1} rounded={6}>
                <Flex alignItems={'center'}>
                    <TeamAvatar name={o.name} iconUri={o.iconUri} subTitle={o.description || 'Full Ownership'} small />

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
                        onConfirm={async () => {
                            await removeOwnership(o.ownershipId);
                            onRemoveOwnership();
                        }}
                        onCancel={removeOwnershipDialog.onClose}
                    />
                </Flex>
            </ListItem>
        );
    };
    return (
        <Flex direction={'column'} gap={1}>
            <Flex>
                <Text fontSize={16}>Ownership</Text>

                <Menu>
                    <MenuButton as={AddIconButton} marginLeft={'auto'} />

                    <MenuList>
                        <MenuItem onClick={props.onAddPersonOwnership}>Person</MenuItem>
                        <MenuItem onClick={props.onAddTeamOwnership}>Team</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>

            <List spacing={4}>
                {ownership.map((o) => {
                    if (isPersonOwnership(o)) {
                        return renderPersonOwnership(o);
                    }

                    if (isTeamOwnership(o)) {
                        return renderTeamOwnership(o);
                    }
                })}
            </List>
        </Flex>
    );
};
