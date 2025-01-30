import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    IconButton,
    Link,
    Portal,
    Show,
    Stack,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { EditTeamLinkData, TeamLink } from '@domaindocs/types';
import { MdOutlineLink } from 'react-icons/md';
import { PropsWithChildren, RefObject, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { EditIconButton } from '../../../components/buttons/EditIconButton';
import { CloseIconButton } from '../../../components/buttons/CloseIconButton';
import { ConfirmDialog } from '../../../components/dialogs/ConfirmDialog';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { FormTextInput } from '../../../components/form/FormTextInput';
import { AddIconButton } from '../../../components/buttons/AddIconButton';
import { teamsApi } from '../../../state/api/teams-api';
import { IoLinkOutline } from 'react-icons/io5';
import {
    PopoverRoot,
    PopoverTrigger,
    PopoverBody,
    PopoverContent,
    PopoverFooter,
} from '../../../components/ui/popover';

type TeamLinksProps = {
    domainId: string;
    teamId: string;
    links: TeamLink[];
};

export const DomainLinks = (props: TeamLinksProps) => {
    const { domainId, teamId, links } = props;

    const ref = useRef(null);

    return (
        <Flex backgroundColor={'lightgray'} p={4} rounded={4} gap={3} direction={'column'}>
            <Flex ref={ref} alignItems={'center'}>
                <Flex alignItems={'center'} backgroundColor={'orange.300'} rounded={6} p={2}>
                    <IoLinkOutline color={'white'} />
                </Flex>

                <Text ml={4} fontSize={16}>
                    Links
                </Text>

                <Box ml={'auto'}>
                    <TeamLinkForm domainId={domainId} teamId={teamId} containerRef={ref}>
                        <AddIconButton />
                    </TeamLinkForm>
                </Box>
            </Flex>

            <ul>
                {links.map((link) => (
                    <TeamLinkListItem key={link.linkId} domainId={domainId} teamId={teamId} link={link} />
                ))}
            </ul>
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

    const [isHovering, setIsHovering] = useState(false);

    const ref = useRef(null);

    const { mutateAsync: deleteLink } = useMutation({
        mutationFn: async () => {
            return teamsApi.deleteLink(domainId, teamId, link.linkId);
        },
    });

    return (
        <li
            ref={ref}
            key={link.linkId}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <Flex alignItems={'center'} height={'40px'}>
                <Flex px={1} gap={2} alignItems={'center'} height={'30px'}>
                    <MdOutlineLink fontSize={18} />

                    <Link fontSize={14} href={link.href} target={'_blank'}>
                        {link.description}
                    </Link>
                </Flex>

                <Box ml={'auto'}>
                    <Show when={isHovering}>
                        <CloseIconButton onClick={deleteDialog.onOpen} variant={'ghost'} />

                        <TeamLinkForm domainId={domainId} teamId={teamId} link={link} containerRef={ref}>
                            <EditIconButton onClick={editPopover.onOpen} variant={'ghost'} />
                        </TeamLinkForm>
                    </Show>
                </Box>
            </Flex>

            <ConfirmDialog
                isOpen={deleteDialog.open}
                header={'Remove link?'}
                onConfirm={deleteLink}
                onCancel={deleteDialog.onClose}
            />
        </li>
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

    const { mutateAsync: createLink } = useMutation<void, any, EditTeamLinkData>({
        mutationFn: (data) => teamsApi.createLink(domainId, teamId, data),
    });

    const { mutateAsync: updateLink } = useMutation<void, any, EditTeamLinkData>({
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
            await updateLink(data);
        } else {
            await createLink(data);
        }
        close();
    };

    return (
        <PopoverRoot
            open={menu.open}
            onOpenChange={(details) => {
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
                                <FormTextInput label={'Link'} name={'href'} control={form.control} />

                                <FormTextInput label={'Description'} name={'description'} control={form.control} />
                            </Stack>
                        </PopoverBody>

                        <PopoverFooter>
                            <ButtonGroup width={'100%'} justifyContent={'flex-end'}>
                                <Button
                                    size={'sm'}
                                    colorPalette={'red'}
                                    onClick={close}
                                    disabled={form.formState.isSubmitting}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    size={'sm'}
                                    colorScheme={'gray'}
                                    type={'submit'}
                                    loading={form.formState.isSubmitting}
                                >
                                    {link ? 'Save' : 'Add'}
                                </Button>
                            </ButtonGroup>
                        </PopoverFooter>
                    </form>
                </PopoverContent>
            </Portal>
        </PopoverRoot>
    );
};
