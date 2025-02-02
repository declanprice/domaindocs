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
import { EditPersonContactData, PersonContact, PersonContactType } from '@domaindocs/types';
import { MdConnectWithoutContact, MdOutlineEmail, MdOutlineLink, MdOutlinePhone } from 'react-icons/md';
import { PropsWithChildren, RefObject, useRef } from 'react';
import { DefaultError, useMutation } from '@tanstack/react-query';
import { peopleApi } from '../../../state/api/people-api';
import { EditIconButton } from '../../../components/buttons/EditIconButton';
import { CloseIconButton } from '../../../components/buttons/CloseIconButton';
import { ConfirmDialog } from '../../../components/dialogs/ConfirmDialog';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { FormMenuRadioSelect } from '../../../components/form/FormMenuRadioSelect';
import { FormTextInput } from '../../../components/form/FormTextInput';
import { AddIconButton } from '../../../components/buttons/AddIconButton';

type PersonContactsProps = {
    domainId: string;
    userId: string;
    contacts: PersonContact[];
};

export const PersonContacts = (props: PersonContactsProps) => {
    const { domainId, userId, contacts } = props;

    const ref = useRef(null);

    return (
        <Flex backgroundColor={'lightgray'} p={2} rounded={4} gap={3} direction={'column'}>
            <Flex ref={ref} alignItems={'center'}>
                <Flex alignItems={'center'} backgroundColor={'yellow.400'} rounded={6} p={2}>
                    <MdConnectWithoutContact color={'white'} />
                </Flex>

                <Text ml={4}>Contact</Text>

                <PersonContactForm domainId={domainId} userId={userId} containerRef={ref}>
                    <AddIconButton size={'xs'} ml={'auto'} />
                </PersonContactForm>
            </Flex>

            <List>
                {contacts.map((contact) => (
                    <PersonContactListItem domainId={domainId} userId={userId} contact={contact} />
                ))}
            </List>
        </Flex>
    );
};

type PersonContactListItemProps = {
    domainId: string;
    userId: string;
    contact: PersonContact;
};

export const PersonContactListItem = (props: PersonContactListItemProps) => {
    const { domainId, userId, contact } = props;

    const deleteDialog = useDisclosure();

    const editPopover = useDisclosure();

    const ref = useRef(null);

    const { mutateAsync: deleteContact } = useMutation<void, DefaultError>({
        mutationKey: ['deleteContact', { domainId, userId, contactId: contact.contactId }],
        mutationFn: async () => {
            return peopleApi.deleteContact(domainId, userId, contact.contactId);
        },
    });

    const renderDescription = () => {
        if (contact.type === PersonContactType.LINK) {
            return (
                <Link href={contact.href} fontSize={12} fontWeight={400}>
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
                    <PersonContactForm domainId={domainId} userId={userId} contact={contact} containerRef={ref}>
                        <EditIconButton size={'xs'} onClick={editPopover.onOpen} />
                    </PersonContactForm>

                    <CloseIconButton size={'xs'} onClick={deleteDialog.onOpen} />
                </ButtonGroup>
            </Flex>

            <ConfirmDialog
                isOpen={deleteDialog.isOpen}
                header={'Remove contact?'}
                onConfirm={deleteContact}
                onClose={deleteDialog.onClose}
            />
        </ListItem>
    );
};

type PersonContactFormProps = {
    domainId: string;
    userId: string;
    contact?: PersonContact;
    containerRef: RefObject<any>;
} & PropsWithChildren;

export const PersonContactForm = (props: PersonContactFormProps) => {
    const { domainId, userId, contact, containerRef } = props;

    const menu = useDisclosure();

    const { mutateAsync: createContact } = useMutation<void, DefaultError, EditPersonContactData>({
        mutationFn: (data) => peopleApi.createContact(domainId, userId, data),
    });

    const { mutateAsync: updateContact } = useMutation<void, DefaultError, EditPersonContactData>({
        mutationFn: (data) => peopleApi.updateContact(domainId, userId, contact?.contactId!, data),
    });

    const form = useForm<EditPersonContactData>({
        values: {
            type: contact ? contact.type : PersonContactType.EMAIL,
            href: contact ? contact.href : '',
            description: contact ? contact.description : '',
        },
        resolver: classValidatorResolver(EditPersonContactData),
    });

    const close = () => {
        menu.onClose();
        form.reset();
    };

    const submit = async (data: EditPersonContactData) => {
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
            case PersonContactType.EMAIL:
                return 'Email address';
            case PersonContactType.MOBILE:
                return 'Mobile number';
            case PersonContactType.LINK:
                return 'Description';
            default:
                return 'Description';
        }
    };

    return (
        <Popover isOpen={menu.isOpen} onOpen={menu.onOpen} onClose={close}>
            <PopoverTrigger>{props.children}</PopoverTrigger>

            <Portal containerRef={containerRef}>
                <PopoverContent mr={2} backgroundColor={'white'}>
                    <form onSubmit={form.handleSubmit(submit)}>
                        <PopoverBody>
                            <Stack spacing={4}>
                                <FormMenuRadioSelect
                                    label={'Contact type'}
                                    name={'type'}
                                    control={form.control}
                                    options={[
                                        {
                                            label: 'Email',
                                            value: PersonContactType.EMAIL,
                                        },
                                        {
                                            label: 'Mobile',
                                            value: PersonContactType.MOBILE,
                                        },
                                        {
                                            label: 'Link',
                                            value: PersonContactType.LINK,
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

                                {selectedType === PersonContactType.LINK && (
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

const renderIcon = (type: PersonContactType) => {
    switch (type) {
        case PersonContactType.EMAIL:
            return <MdOutlineEmail fontSize={18} />;
        case PersonContactType.LINK:
            return <MdOutlineLink fontSize={18} />;
        case PersonContactType.MOBILE:
            return <MdOutlinePhone fontSize={18} />;
        default:
            return <MdOutlineLink fontSize={18} />;
    }
};
