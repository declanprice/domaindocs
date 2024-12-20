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
import { PropsWithChildren, RefObject, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { FormCheckbox } from '../../../components/form/FormCheckbox';
import { DefaultError, useMutation, useQuery } from '@tanstack/react-query';
import { rolesApi } from '../../../state/api/roles-api';
import { FormCreateSelect } from '../../../components/form/FormCreateSelect';
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

    const ref = useRef(null);

    return (
        <Flex backgroundColor={'lightgray'} p={2} rounded={4} gap={3} direction={'column'}>
            <Flex ref={ref} alignItems={'center'}>
                <Flex alignItems={'center'} backgroundColor={'teal.400'} rounded={6} p={2}>
                    <GrWorkshop color={'white'} />
                </Flex>

                <Text ml={4}>Roles</Text>

                <PersonRoleForm domainId={domainId} userId={person.person.userId} containerRef={ref}>
                    <AddIconButton size={'xs'} ml={'auto'} />
                </PersonRoleForm>
            </Flex>

            <List spacing={2}>
                {roles.map((role) => (
                    <PersonRoleListItem domainId={domainId} userId={person.person.userId} role={role} />
                ))}
            </List>
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
                    <PersonRoleForm domainId={domainId} userId={userId} role={role} containerRef={ref}>
                        <EditIconButton size={'xs'} onClick={editPopover.onOpen} />
                    </PersonRoleForm>

                    <CloseIconButton size={'xs'} onClick={deleteDialog.onOpen} />
                </ButtonGroup>
            </Flex>

            <ConfirmDialog
                isOpen={deleteDialog.isOpen}
                header={'Remove role?'}
                onConfirm={deletePersonRole}
                onCancel={deleteDialog.onClose}
            />
        </ListItem>
    );
};

type PersonRoleFormProps = {
    domainId: string;
    userId: string;
    role?: PersonRole;
    containerRef: RefObject<any>;
} & PropsWithChildren;

export const PersonRoleForm = (props: PersonRoleFormProps) => {
    const { domainId, userId, role, containerRef } = props;

    const menu = useDisclosure();

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
        menu.onClose();
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

    return (
        <Popover isOpen={menu.isOpen} onOpen={menu.onOpen} onClose={close}>
            <PopoverTrigger>{props.children}</PopoverTrigger>

            <Portal containerRef={containerRef}>
                <PopoverContent mr={2} backgroundColor={'white'}>
                    <form onSubmit={form.handleSubmit(submit)}>
                        <PopoverBody>
                            <Stack spacing={4}>
                                <FormCreateSelect
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
                        </PopoverBody>

                        <PopoverFooter>
                            <ButtonGroup width={'100%'} justifyContent={'flex-end'}>
                                <Button
                                    size={'sm'}
                                    variant={'red'}
                                    onClick={close}
                                    isDisabled={form.formState.isSubmitting}
                                >
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
                        </PopoverFooter>
                    </form>
                </PopoverContent>
            </Portal>
        </Popover>
    );
};
