import { DomainContact, EditTeamContactData, ContactType, Contact, EditContactData } from '@domaindocs/types';
import { PropsWithChildren, RefObject, useRef } from 'react';
import { Box, Button, ButtonGroup, Flex, Link, Portal, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { MdConnectWithoutContact, MdOutlineEmail, MdOutlineLink, MdOutlinePhone } from 'react-icons/md';
import { AddIconButton } from '../buttons/AddIconButton';
import { EditIconButton } from '../buttons/EditIconButton';
import { CloseIconButton } from '../buttons/CloseIconButton';
import { ConfirmDialog } from '../dialogs/ConfirmDialog';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { PopoverBody, PopoverContent, PopoverFooter, PopoverRoot, PopoverTrigger } from '../ui/popover';
import { FormMenuRadioSelect } from '../form/FormMenuRadioSelect';
import { FormTextInput } from '../form/FormTextInput';

type ContactsProps = {
    contacts: DomainContact[];
    onAddContact: (data: EditContactData) => Promise<any>;
    onUpdateContact: (data: EditContactData) => Promise<any>;
    onRemoveContact: (contact: Contact) => Promise<any>;
};

export const Contacts = (props: ContactsProps) => {
    const { onAddContact, onUpdateContact, onRemoveContact, contacts } = props;

    const ref = useRef(null);

    return (
        <Flex backgroundColor={'lightgray'} p={4} rounded={4} gap={3} direction={'column'}>
            <Flex ref={ref} alignItems={'center'}>
                <Flex alignItems={'center'} backgroundColor={'yellow.400'} rounded={6} p={2}>
                    <MdConnectWithoutContact color={'white'} />
                </Flex>

                <Text ml={4} fontSize={16}>
                    Contact
                </Text>

                <Box ml={'auto'}>
                    <ContactForm onUpdateContact={onUpdateContact} onAddContact={onAddContact} containerRef={ref}>
                        <AddIconButton />
                    </ContactForm>
                </Box>
            </Flex>

            <ul>
                {contacts.map((contact) => (
                    <ContactListItem
                        onUpdateContact={onUpdateContact}
                        onAddContact={onAddContact}
                        onRemoveContact={onRemoveContact}
                        contact={contact}
                    />
                ))}
            </ul>
        </Flex>
    );
};

type ContactListItemProps = {
    onAddContact: (data: EditContactData) => Promise<any>;
    onUpdateContact: (data: EditContactData) => Promise<any>;
    onRemoveContact: (contact: Contact) => Promise<any>;
    contact: Contact;
};

export const ContactListItem = (props: ContactListItemProps) => {
    const { onAddContact, onUpdateContact, onRemoveContact, contact } = props;

    const deleteDialog = useDisclosure();

    const editPopover = useDisclosure();

    const ref = useRef(null);

    const renderDescription = () => {
        if (contact.type === ContactType.LINK) {
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
        <li ref={ref} key={contact.contactId}>
            <Flex alignItems={'center'}>
                <Flex px={1} gap={2} alignItems={'center'} height={'30px'}>
                    {renderIcon(contact.type)}

                    {renderDescription()}
                </Flex>

                <ButtonGroup display={'none'} _groupHover={{ display: 'flex' }} gap={1} ml={'auto'}>
                    <ContactForm
                        onAddContact={onAddContact}
                        onUpdateContact={onUpdateContact}
                        contact={contact}
                        containerRef={ref}
                    >
                        <EditIconButton size={'xs'} onClick={editPopover.onOpen} />
                    </ContactForm>

                    <CloseIconButton size={'xs'} onClick={deleteDialog.onOpen} />
                </ButtonGroup>
            </Flex>

            <ConfirmDialog
                isOpen={deleteDialog.open}
                header={'Remove contact?'}
                onConfirm={async () => {
                    await onRemoveContact(contact);
                }}
                onCancel={deleteDialog.onClose}
            />
        </li>
    );
};

type ContactFormProps = {
    onAddContact: (data: EditContactData) => Promise<any>;
    onUpdateContact: (data: EditContactData) => Promise<any>;
    contact?: Contact;
    containerRef: RefObject<any>;
} & PropsWithChildren;

export const ContactForm = (props: ContactFormProps) => {
    const { onAddContact, onUpdateContact, contact, containerRef } = props;

    const menu = useDisclosure();

    const form = useForm<EditContactData>({
        values: {
            contactId: contact ? contact.contactId : undefined,
            type: contact ? contact.type : ContactType.EMAIL,
            href: contact ? contact.href : '',
            description: contact ? contact.description : '',
        },
        resolver: classValidatorResolver(EditTeamContactData),
    });

    const close = () => {
        menu.onClose();
        form.reset();
    };

    const submit = async (data: EditContactData) => {
        if (data.contactId == undefined) {
            await onAddContact(data);
        } else {
            await onUpdateContact(data);
        }
        close();
    };

    const selectedType = form.watch('type');

    const renderDescriptionLabel = () => {
        switch (selectedType) {
            case ContactType.EMAIL:
                return 'Email address';
            case ContactType.MOBILE:
                return 'Mobile number';
            case ContactType.LINK:
                return 'Description';
            default:
                return 'Description';
        }
    };

    return (
        <PopoverRoot
            open={menu.open}
            onOpenChange={(details: { open: boolean }) => {
                if (details.open) {
                    menu.onOpen();
                } else {
                    menu.onClose();
                }
            }}
        >
            <PopoverTrigger>{props.children}</PopoverTrigger>

            <Portal containerRef={containerRef}>
                <PopoverContent mr={2} backgroundColor={'white'}>
                    <form onSubmit={form.handleSubmit(submit)}>
                        <PopoverBody>
                            <Stack gap={4}>
                                <FormMenuRadioSelect
                                    label={'Contact type'}
                                    name={'type'}
                                    control={form.control}
                                    options={[
                                        {
                                            label: 'Email',
                                            value: ContactType.EMAIL,
                                        },
                                        {
                                            label: 'Mobile',
                                            value: ContactType.MOBILE,
                                        },
                                        {
                                            label: 'Link',
                                            value: ContactType.LINK,
                                        },
                                    ]}
                                    renderButton={(option) => (
                                        <Button>
                                            {option && renderIcon(option.value as any)}
                                            {option?.label || 'Select Option'}x
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

                                {selectedType === ContactType.LINK && (
                                    <FormTextInput label={'Href'} name={'href'} control={form.control} />
                                )}
                            </Stack>
                        </PopoverBody>

                        <PopoverFooter>
                            <ButtonGroup width={'100%'} justifyContent={'flex-end'}>
                                <Button colorPalette={'red'} onClick={close} disabled={form.formState.isSubmitting}>
                                    Cancel
                                </Button>

                                <Button colorPalette={'gray'} type={'submit'} loading={form.formState.isSubmitting}>
                                    {contact ? 'Save' : 'Add'}
                                </Button>
                            </ButtonGroup>
                        </PopoverFooter>
                    </form>
                </PopoverContent>
            </Portal>
        </PopoverRoot>
    );
};

const renderIcon = (type: ContactType) => {
    switch (type) {
        case ContactType.EMAIL:
            return <MdOutlineEmail fontSize={18} />;
        case ContactType.LINK:
            return <MdOutlineLink fontSize={18} />;
        case ContactType.MOBILE:
            return <MdOutlinePhone fontSize={18} />;
        default:
            return <MdOutlineLink fontSize={18} />;
    }
};
