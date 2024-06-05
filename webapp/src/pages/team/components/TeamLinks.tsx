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
import { EditTeamContactData, EditTeamLinkData, TeamContact, TeamContactType, TeamLink } from '@domaindocs/types';
import { MdConnectWithoutContact, MdOutlineEmail, MdOutlineLink, MdOutlinePhone } from 'react-icons/md';
import { PropsWithChildren, RefObject, useRef } from 'react';
import { DefaultError, useMutation } from '@tanstack/react-query';
import { EditIconButton } from '../../../components/buttons/EditIconButton';
import { CloseIconButton } from '../../../components/buttons/CloseIconButton';
import { ConfirmDialog } from '../../../components/dialogs/ConfirmDialog';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { FormTextInput } from '../../../components/form/FormTextInput';
import { AddIconButton } from '../../../components/buttons/AddIconButton';
import { teamsApi } from '../../../state/api/teams-api';
import { IoLinkOutline } from 'react-icons/io5';

type TeamLinksProps = {
    domainId: string;
    teamId: string;
    links: TeamLink[];
};

export const TeamLinks = (props: TeamLinksProps) => {
    const { domainId, teamId, links } = props;

    const ref = useRef(null);

    return (
        <Flex backgroundColor={'lightgray'} p={2} rounded={4} gap={3} direction={'column'}>
            <Flex ref={ref} alignItems={'center'}>
                <Flex alignItems={'center'} backgroundColor={'orange.300'} rounded={6} p={2}>
                    <IoLinkOutline color={'white'} />
                </Flex>

                <Text ml={4}>Links</Text>

                <TeamLinkForm domainId={domainId} teamId={teamId} containerRef={ref}>
                    <AddIconButton size={'xs'} ml={'auto'} />
                </TeamLinkForm>
            </Flex>

            <List>
                {links.map((link) => (
                    <TeamLinkListItem domainId={domainId} teamId={teamId} link={link} />
                ))}
            </List>
        </Flex>
    );
};

type TeamLinkListItemProps = {
    domainId: string;
    teamId: string;
    link: TeamLink;
};

export const TeamLinkListItem = (props: TeamLinkListItemProps) => {
    const { domainId, teamId, link } = props;

    const deleteDialog = useDisclosure();

    const editPopover = useDisclosure();

    const ref = useRef(null);

    const { mutateAsync: deleteLink } = useMutation({
        mutationFn: async () => {
            return teamsApi.deleteLink(domainId, teamId, link.linkId);
        },
    });

    return (
        <ListItem
            ref={ref}
            key={link.linkId}
            p={1}
            _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
            rounded={6}
            data-group
        >
            <Flex alignItems={'center'}>
                <Flex px={1} gap={2} alignItems={'center'} height={'30px'}>
                    <MdOutlineLink fontSize={18} />

                    <Link fontSize={12} href={link.href} target={'_blank'}>
                        {link.description}
                    </Link>
                </Flex>

                <ButtonGroup display={'none'} _groupHover={{ display: 'flex' }} spacing={1} ml={'auto'}>
                    <TeamLinkForm domainId={domainId} teamId={teamId} link={link} containerRef={ref}>
                        <EditIconButton size={'xs'} onClick={editPopover.onOpen} />
                    </TeamLinkForm>

                    <CloseIconButton size={'xs'} onClick={deleteDialog.onOpen} />
                </ButtonGroup>
            </Flex>

            <ConfirmDialog
                isOpen={deleteDialog.isOpen}
                header={'Remove link?'}
                onConfirm={deleteLink}
                onCancel={deleteDialog.onClose}
            />
        </ListItem>
    );
};

type TeamLinkFormProps = {
    domainId: string;
    teamId: string;
    link?: TeamLink;
    containerRef: RefObject<any>;
} & PropsWithChildren;

export const TeamLinkForm = (props: TeamLinkFormProps) => {
    const { domainId, teamId, link, containerRef } = props;

    const menu = useDisclosure();

    const { mutateAsync: createContact } = useMutation<void, any, EditTeamLinkData>({
        mutationFn: (data) => teamsApi.createLink(domainId, teamId, data),
    });

    const { mutateAsync: updateContact } = useMutation<void, any, EditTeamLinkData>({
        mutationFn: (data) => teamsApi.updateLink(domainId, teamId, link?.linkId!, data),
    });

    const form = useForm<EditTeamLinkData>({
        values: {
            href: link ? link.href : '',
            description: link ? link.description : '',
        },
        resolver: classValidatorResolver(EditTeamLinkData),
    });

    const close = () => {
        menu.onClose();
        form.reset();
    };

    const submit = async (data: EditTeamLinkData) => {
        if (link) {
            await updateContact(data);
        } else {
            await createContact(data);
        }
        close();
    };

    return (
        <Popover isOpen={menu.isOpen} onOpen={menu.onOpen} onClose={close}>
            <PopoverTrigger>{props.children}</PopoverTrigger>

            <Portal containerRef={containerRef}>
                <PopoverContent mr={2} backgroundColor={'lightgray'}>
                    <form onSubmit={form.handleSubmit(submit)}>
                        <PopoverBody>
                            <Stack spacing={4}>
                                <FormTextInput label={'Href'} name={'href'} control={form.control} />

                                <FormTextInput label={'Description'} name={'description'} control={form.control} />
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
                                    {link ? 'Save' : 'Add'}
                                </Button>
                            </ButtonGroup>
                        </PopoverFooter>
                    </form>
                </PopoverContent>
            </Portal>
        </Popover>
    );
};
