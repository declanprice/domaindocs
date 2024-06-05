import {
    Button,
    ButtonGroup,
    Flex,
    Link,
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
import { EditTeamContactData, TeamContact, TeamContactType } from '@domaindocs/types';
import { MdConnectWithoutContact, MdOutlineEmail, MdOutlineLink, MdOutlinePhone } from 'react-icons/md';
import { PropsWithChildren, RefObject, useRef } from 'react';
import { DefaultError, useMutation } from '@tanstack/react-query';
import { EditIconButton } from '../../../components/buttons/EditIconButton';
import { CloseIconButton } from '../../../components/buttons/CloseIconButton';
import { ConfirmDialog } from '../../../components/dialogs/ConfirmDialog';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { FormMenuSelect } from '../../../components/form/FormMenuSelect';
import { FormTextInput } from '../../../components/form/FormTextInput';
import { AddIconButton } from '../../../components/buttons/AddIconButton';
import { teamsApi } from '../../../state/api/teams-api';

type TeamContactsProps = {
    domainId: string;
    teamId: string;
    contacts: TeamContact[];
};

export const TeamContacts = (props: TeamContactsProps) => {
    const { domainId, teamId, contacts } = props;

    const ref = useRef(null);

    return (
        <Flex backgroundColor={'lightgray'} p={2} rounded={4} gap={3} direction={'column'}>
            <Flex ref={ref} alignItems={'center'}>
                <Flex alignItems={'center'} backgroundColor={'yellow.400'} rounded={6} p={2}>
                    <MdConnectWithoutContact color={'white'} />
                </Flex>

                <Text ml={4}>Contact</Text>

                <TeamContactForm domainId={domainId} teamId={teamId} containerRef={ref}>
                    <AddIconButton size={'xs'} ml={'auto'} />
                </TeamContactForm>
            </Flex>

            <List>
                {contacts.map((contact) => (
                    <TeamContactListItem domainId={domainId} teamId={teamId} contact={contact} />
                ))}
            </List>
        </Flex>
    );
};

type TeamContactListItemProps = {
    domainId: string;
    teamId: string;
    contact: TeamContact;
};

export const TeamContactListItem = (props: TeamContactListItemProps) => {
    const { domainId, teamId, contact } = props;

    const deleteDialog = useDisclosure();

    const editPopover = useDisclosure();

    const ref = useRef(null);

    const { mutateAsync: deleteContact } = useMutation<void, DefaultError>({
        mutationKey: ['deleteContact', { domainId, teamId, contactId: contact.contactId }],
        mutationFn: async () => {
            return teamsApi.deleteContact(domainId, teamId, contact.contactId);
        },
    });

    const renderDescription = () => {
        if (contact.type === TeamContactType.LINK) {
            return (
                <Link target={'_blank'} href={contact.href} fontSize={12} fontWeight={400}>
                    {contact.description}
                </Link>
            );
        }

        return (
            <Text fontSize={12} fontWeight={400}>
                {contact.description}
            </Text>
        );
    };

    return (
        <ListItem
            ref={ref}
            key={contact.contactId}
            p={1}
            _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
            rounded={6}
            data-group
        >
            <Flex alignItems={'center'}>
                <Flex px={1} gap={2} alignItems={'center'} height={'30px'}>
                    {renderIcon(contact.type)}

                    {renderDescription()}
                </Flex>

                <ButtonGroup display={'none'} _groupHover={{ display: 'flex' }} spacing={1} ml={'auto'}>
                    <TeamContactForm domainId={domainId} teamId={teamId} contact={contact} containerRef={ref}>
                        <EditIconButton size={'xs'} onClick={editPopover.onOpen} />
                    </TeamContactForm>

                    <CloseIconButton size={'xs'} onClick={deleteDialog.onOpen} />
                </ButtonGroup>
            </Flex>

            <ConfirmDialog
                isOpen={deleteDialog.isOpen}
                header={'Remove contact?'}
                onConfirm={deleteContact}
                onCancel={deleteDialog.onClose}
            />
        </ListItem>
    );
};

type TeamContactFormProps = {
    domainId: string;
    teamId: string;
    contact?: TeamContact;
    containerRef: RefObject<any>;
} & PropsWithChildren;

export const TeamContactForm = (props: TeamContactFormProps) => {
    const { domainId, teamId, contact, containerRef } = props;

    const menu = useDisclosure();

    const { mutateAsync: createContact } = useMutation<void, any, EditTeamContactData>({
        mutationFn: (data) => teamsApi.createContact(domainId, teamId, data),
    });

    const { mutateAsync: updateContact } = useMutation<void, any, EditTeamContactData>({
        mutationFn: (data) => teamsApi.updateContact(domainId, teamId, contact?.contactId!, data),
    });

    const form = useForm<EditTeamContactData>({
        values: {
            type: contact ? contact.type : TeamContactType.EMAIL,
            href: contact ? contact.href : '',
            description: contact ? contact.description : '',
        },
        resolver: classValidatorResolver(EditTeamContactData),
    });

    const close = () => {
        menu.onClose();
        form.reset();
    };

    const submit = async (data: EditTeamContactData) => {
        if (contact) {
            await updateContact(data);
        } else {
            await createContact(data);
        }
        close();
    };

    const selectedType = form.watch('type');

    const renderDescriptionLabel = () => {
        switch (selectedType) {
            case TeamContactType.EMAIL:
                return 'Email address';
            case TeamContactType.MOBILE:
                return 'Mobile number';
            case TeamContactType.LINK:
                return 'Description';
            default:
                return 'Description';
        }
    };

    return (
        <Popover isOpen={menu.isOpen} onOpen={menu.onOpen} onClose={close}>
            <PopoverTrigger>{props.children}</PopoverTrigger>

            <Portal containerRef={containerRef}>
                <PopoverContent mr={2} backgroundColor={'lightgray'}>
                    <form onSubmit={form.handleSubmit(submit)}>
                        <PopoverBody>
                            <Stack spacing={4}>
                                <FormMenuSelect
                                    label={'Contact type'}
                                    name={'type'}
                                    control={form.control}
                                    options={[
                                        {
                                            label: 'Email',
                                            value: TeamContactType.EMAIL,
                                        },
                                        {
                                            label: 'Mobile',
                                            value: TeamContactType.MOBILE,
                                        },
                                        {
                                            label: 'Link',
                                            value: TeamContactType.LINK,
                                        },
                                    ]}
                                    renderButton={(option) => (
                                        <Button
                                            size={'sm'}
                                            leftIcon={option ? renderIcon(option.value as any) : undefined}
                                        >
                                            {option?.label || 'Select Option'}
                                        </Button>
                                    )}
                                    renderOption={(option) => (
                                        <Flex>
                                            {renderIcon(option.value as any)}
                                            <Text fontSize={12} ml={2}>
                                                {option?.label}
                                            </Text>
                                        </Flex>
                                    )}
                                />

                                <FormTextInput
                                    label={renderDescriptionLabel()}
                                    name={'description'}
                                    control={form.control}
                                />

                                {selectedType === TeamContactType.LINK && (
                                    <FormTextInput label={'Href'} name={'href'} control={form.control} />
                                )}
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
                                    {contact ? 'Save' : 'Add'}
                                </Button>
                            </ButtonGroup>
                        </PopoverFooter>
                    </form>
                </PopoverContent>
            </Portal>
        </Popover>
    );
};

const renderIcon = (type: TeamContactType) => {
    switch (type) {
        case TeamContactType.EMAIL:
            return <MdOutlineEmail fontSize={18} />;
        case TeamContactType.LINK:
            return <MdOutlineLink fontSize={18} />;
        case TeamContactType.MOBILE:
            return <MdOutlinePhone fontSize={18} />;
        default:
            return <MdOutlineLink fontSize={18} />;
    }
};
