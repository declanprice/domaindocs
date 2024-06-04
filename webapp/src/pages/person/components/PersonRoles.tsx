import { EditPersonRoleData, CreateRoleData, DetailedPerson, PersonRole, Role } from '@domaindocs/types';
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    Flex,
    List,
    ListItem,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverFooter,
    PopoverTrigger,
    Portal,
    Stack,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { GrWorkshop } from 'react-icons/gr';
import { AddIconButton } from '../../../components/buttons/AddIconButton';
import { CloseIconButton } from '../../../components/buttons/CloseIconButton';
import { useHover } from '@uidotdev/usehooks';
import { PropsWithChildren, Ref, RefObject, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { FormCheckbox } from '../../../components/form/FormCheckbox';
import { DefaultError, useMutation, useQuery } from '@tanstack/react-query';
import { rolesApi } from '../../../state/api/roles-api';
import { FormCreatableSelectable } from '../../../components/form/FormCreatableSelectable';
import { queryClient } from '../../../state/query-client';
import { peopleApi } from '../../../state/api/people-api';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { ConfirmDialog } from '../../../components/dialogs/ConfirmDialog';
import { EditIconButton } from '../../../components/buttons/EditIconButton';

type PersonRolesProps = {
    domainId: string;
    person: DetailedPerson;
};

export const PersonRoles = (props: PersonRolesProps) => {
    const { domainId, person } = props;

    const roles = person.roles.sort((r) => (r.isPrimary ? 0 : 1));

    const addRoleMenu = useDisclosure();

    const addRoleRef = useRef(null);

    return (
        <Flex backgroundColor={'lightgray'} p={2} rounded={4} gap={3} direction={'column'}>
            <Flex alignItems={'center'} ref={addRoleRef}>
                <Flex alignItems={'center'} backgroundColor={'teal.400'} rounded={6} p={2}>
                    <GrWorkshop color={'white'} />
                </Flex>

                <Text ml={4}>Roles</Text>

                <AddIconButton size={'xs'} ml={'auto'} onClick={addRoleMenu.onOpen} />
            </Flex>

            <List spacing={2}>
                {roles.map((role) => (
                    <PersonRoleListItem domainId={domainId} userId={person.person.userId} role={role} />
                ))}
            </List>

            <PersonRoleForm
                domainId={domainId}
                userId={person.person.userId}
                isOpen={addRoleMenu.isOpen}
                onClose={addRoleMenu.onClose}
                containerRef={addRoleRef}
            />
        </Flex>
    );
};

type PersonRoleListItemProps = {
    domainId: string;
    userId: string;
    role: PersonRole;
};

export const PersonRoleListItem = (props: PersonRoleListItemProps) => {
    const { domainId, userId, role } = props;

    const deleteDialog = useDisclosure();

    const editPopover = useDisclosure();

    const ref = useRef(null);

    const { mutateAsync: deletePersonRole } = useMutation<void, DefaultError>({
        mutationKey: ['deletePersonRole', { domainId, userId, roleId: role.roleId }],
        mutationFn: async () => {
            return peopleApi.deleteRole(domainId, userId, role.roleId);
        },
    });

    return (
        <ListItem
            ref={ref}
            key={role.roleId}
            p={1}
            _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
            rounded={6}
            data-group
        >
            <Flex alignItems={'center'}>
                <Stack spacing={0}>
                    <Text fontSize={12} fontWeight={300}>
                        {role.isPrimary ? 'Primary' : 'Secondary'}
                    </Text>

                    <Text fontSize={12} fontWeight={400}>
                        {role.roleName}
                    </Text>
                </Stack>

                <ButtonGroup display={'none'} _groupHover={{ display: 'flex' }} spacing={1} ml={'auto'}>
                    <EditIconButton size={'xs'} onClick={editPopover.onOpen} />

                    <CloseIconButton size={'xs'} onClick={deleteDialog.onOpen} />
                </ButtonGroup>
            </Flex>

            <ConfirmDialog
                isOpen={deleteDialog.isOpen}
                header={'Remove role?'}
                onConfirm={deletePersonRole}
                onCancel={deleteDialog.onClose}
            />

            <PersonRoleForm
                domainId={domainId}
                userId={userId}
                role={role}
                isOpen={editPopover.isOpen}
                onClose={editPopover.onClose}
                containerRef={ref}
            />
        </ListItem>
    );
};

type PersonRoleFormProps = {
    domainId: string;
    userId: string;
    isOpen: boolean;
    onClose: () => void;
    containerRef: RefObject<any>;
    role?: PersonRole;
} & PropsWithChildren;

export const PersonRoleForm = (props: PersonRoleFormProps) => {
    const { domainId, userId, role, isOpen, containerRef, onClose } = props;

    const { data: allRoles, isLoading } = useQuery<Role[]>({
        queryKey: ['searchRoles', { domainId }],
        queryFn: () => rolesApi.search(domainId, {}),
    });

    const { mutateAsync: createRole } = useMutation<Role, DefaultError, CreateRoleData>({
        mutationKey: ['createRole', { domainId }],
        mutationFn: async (data) => {
            return rolesApi.create(domainId, data);
        },
    });

    const { mutateAsync: createPersonRole } = useMutation<void, DefaultError, EditPersonRoleData>({
        mutationKey: ['createPersonRole', { domainId, userId }],
        mutationFn: async (data) => {
            return peopleApi.createRole(domainId, userId, data);
        },
    });

    const { mutateAsync: updatePersonRole } = useMutation<void, DefaultError, EditPersonRoleData>({
        mutationKey: ['updatePersonRole', { domainId, userId, roleId: role?.roleId }],
        mutationFn: async (data) => {
            return peopleApi.updateRole(domainId, userId, role?.roleId!, data);
        },
    });

    const form = useForm<EditPersonRoleData>({
        values: {
            roleId: role ? role.roleId : '',
            isPrimary: role ? role.isPrimary : false,
        },
        resolver: classValidatorResolver(EditPersonRoleData),
    });

    const close = () => {
        onClose();
        form.reset();
    };

    const submit = async (data: EditPersonRoleData) => {
        if (role) {
            await updatePersonRole(data);
        } else {
            await createPersonRole(data);
        }
        close();
    };

    if (!allRoles || isLoading) return null;

    if (!isOpen) return false;

    return (
        <Portal containerRef={containerRef}>
            <Card position={'absolute'} width={'300px'} py={2} px={3} mr={2} backgroundColor={'lightgray'}>
                <form onSubmit={form.handleSubmit(submit)}>
                    <Stack spacing={4}>
                        <FormCreatableSelectable
                            label={'Role'}
                            name={'roleId'}
                            control={form.control}
                            options={allRoles.map((s) => ({
                                label: s.name,
                                value: s.roleId,
                            }))}
                            isMulti={false}
                            onCreateOption={async (name) => {
                                const role = await createRole({
                                    name,
                                });

                                form.setValue('roleId', role.roleId);

                                queryClient.setQueryData(['searchRoles', { domainId }], [...allRoles, role]);
                            }}
                        />

                        <FormCheckbox label={'Is Primary Role'} name={'isPrimary'} control={form.control} />
                    </Stack>

                    <ButtonGroup width={'100%'} justifyContent={'flex-end'}>
                        <Button size={'sm'} variant={'red'} onClick={close} isDisabled={form.formState.isSubmitting}>
                            Cancel
                        </Button>

                        <Button
                            size={'sm'}
                            colorScheme={'blue'}
                            type={'submit'}
                            isLoading={form.formState.isSubmitting}
                        >
                            {role ? 'Save' : 'Add'}
                        </Button>
                    </ButtonGroup>
                </form>
            </Card>
        </Portal>
    );
};
