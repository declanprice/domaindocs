import { Box, Button, ButtonGroup, Flex, Link, Portal, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { EditTeamContactData, TeamContact, ContactType } from '@domaindocs/types';
import { MdConnectWithoutContact, MdOutlineEmail, MdOutlineLink, MdOutlinePhone } from 'react-icons/md';
import { PropsWithChildren, RefObject, useRef } from 'react';
import { DefaultError, useMutation } from '@tanstack/react-query';
import { EditIconButton } from '../../../components/buttons/EditIconButton';
import { CloseIconButton } from '../../../components/buttons/CloseIconButton';
import { ConfirmDialog } from '../../../components/dialogs/ConfirmDialog';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { FormMenuRadioSelect } from '../../../components/form/FormMenuRadioSelect';
import { FormTextInput } from '../../../components/form/FormTextInput';
import { AddIconButton } from '../../../components/buttons/AddIconButton';
import { teamsApi } from '../../../state/api/teams-api';
import {
    PopoverRoot,
    PopoverTrigger,
    PopoverBody,
    PopoverContent,
    PopoverFooter,
} from '../../../components/ui/popover';

type TeamContactsProps = {
    domainId: string;
    teamId: string;
    contacts: TeamContact[];
};

export const TeamContacts = (props: TeamContactsProps) => {
    const { domainId, teamId, contacts } = props;

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
                    <TeamContactForm domainId={domainId} teamId={teamId} containerRef={ref}>
                        <AddIconButton />
                    </TeamContactForm>
                </Box>
            </Flex>

            <ul>
                {contacts.map((contact) => (
                    <TeamContactListItem domainId={domainId} teamId={teamId} contact={contact} />
                ))}
            </ul>
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
                    <TeamContactForm domainId={domainId} teamId={teamId} contact={contact} containerRef={ref}>
                        <EditIconButton size={'xs'} onClick={editPopover.onOpen} />
                    </TeamContactForm>

                    <CloseIconButton size={'xs'} onClick={deleteDialog.onOpen} />
                </ButtonGroup>
            </Flex>

            <ConfirmDialog
                isOpen={deleteDialog.open}
                header={'Remove contact?'}
                onConfirm={deleteContact}
                onClose={deleteDialog.onClose}
            />
        </li>
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
            onOpenChange={(details: any) => {
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
