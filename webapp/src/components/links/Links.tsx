import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    Link as ChakraLink,
    Portal,
    Show,
    Stack,
    Text,
    useDisclosure,
    VisuallyHidden,
} from '@chakra-ui/react';
import { Link, EditLinkData } from '@domaindocs/types';
import { MdOutlineLink } from 'react-icons/md';
import { PropsWithChildren, RefObject, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { IoLinkOutline } from 'react-icons/io5';
import { AddIconButton } from '../buttons/AddIconButton';
import { ConfirmDialog } from '../dialogs/ConfirmDialog';
import { CloseIconButton } from '../buttons/CloseIconButton';
import { EditIconButton } from '../buttons/EditIconButton';
import { PopoverBody, PopoverContent, PopoverFooter, PopoverRoot, PopoverTrigger } from '../ui/popover';
import { FormTextInput } from '../form/FormTextInput';

type LinksProps = {
    onAddLink: (link: EditLinkData) => Promise<void>;
    onUpdateLink: (link: EditLinkData) => Promise<void>;
    onRemoveLink: (link: Link) => Promise<void>;
    links: Link[];
};

export const Links = (props: LinksProps) => {
    const { links, onAddLink, onUpdateLink, onRemoveLink } = props;

    return (
        <Flex backgroundColor={'lightgray'} p={4} rounded={4} gap={3} direction={'column'}>
            <Flex alignItems={'center'}>
                <Flex alignItems={'center'} backgroundColor={'orange.300'} rounded={6} p={2}>
                    <IoLinkOutline color={'white'} />
                </Flex>

                <Text ml={4} fontSize={18}>
                    Links
                </Text>

                <Box ml={'auto'}>
                    <LinkForm onAddLink={onAddLink} onUpdateLink={onUpdateLink}>
                        <AddIconButton />
                    </LinkForm>
                </Box>
            </Flex>

            <ul>
                {links.map((link) => (
                    <LinkListItem
                        key={link.linkId}
                        onAddLink={onAddLink}
                        onUpdateLink={onUpdateLink}
                        onRemoveLink={onRemoveLink}
                        link={link}
                    />
                ))}
            </ul>
        </Flex>
    );
};

type LinkListItemProps = {
    onAddLink: (link: EditLinkData) => Promise<void>;
    onUpdateLink: (link: EditLinkData) => Promise<void>;
    onRemoveLink: (link: Link) => Promise<void>;
    link: Link;
};

export const LinkListItem = (props: LinkListItemProps) => {
    const { onAddLink, onUpdateLink, onRemoveLink, link } = props;

    const deleteDialog = useDisclosure();

    const editPopover = useDisclosure();

    const [isHovering, setIsHovering] = useState(false);

    const ref = useRef(null);

    return (
        <li
            ref={ref}
            key={link.linkId}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <Flex alignItems={'center'} height={'40px'}>
                <Flex px={1} gap={3} alignItems={'center'} height={'30px'}>
                    <MdOutlineLink size={24} />

                    <ChakraLink fontSize={14} href={link.href} target={'_blank'}>
                        {link.description}
                    </ChakraLink>
                </Flex>

                <Box ml={'auto'} visibility={isHovering ? 'visible' : 'hidden'}>
                    <CloseIconButton onClick={deleteDialog.onOpen} variant={'ghost'} />

                    <LinkForm onAddLink={onAddLink} onUpdateLink={onUpdateLink} link={link}>
                        <EditIconButton onClick={editPopover.onOpen} variant={'ghost'} />
                    </LinkForm>
                </Box>
            </Flex>

            <ConfirmDialog
                isOpen={deleteDialog.open}
                header={'Remove link?'}
                onConfirm={async () => {
                    await onRemoveLink(link);
                }}
                onClose={deleteDialog.onClose}
            />
        </li>
    );
};

type LinkFormProps = {
    link?: Link;
    onAddLink: (link: EditLinkData) => Promise<void>;
    onUpdateLink: (link: EditLinkData) => Promise<void>;
} & PropsWithChildren;

export const LinkForm = (props: LinkFormProps) => {
    const { onAddLink, onUpdateLink, link } = props;

    const menu = useDisclosure();

    const form = useForm<EditLinkData>({
        values: {
            linkId: link ? link.linkId : undefined,
            href: link ? link.href : '',
            description: link ? link.description : '',
        },
        resolver: classValidatorResolver(EditLinkData),
    });

    const close = () => {
        menu.onClose();
        form.reset();
    };

    const submit = async (data: EditLinkData) => {
        if (link == undefined) {
            await onAddLink(data);
        } else {
            await onUpdateLink(data);
        }
        close();
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
                            <Button colorPalette={'red'} onClick={close} disabled={form.formState.isSubmitting}>
                                Cancel
                            </Button>

                            <Button colorScheme={'gray'} type={'submit'} loading={form.formState.isSubmitting}>
                                {link ? 'Save' : 'Add'}
                            </Button>
                        </ButtonGroup>
                    </PopoverFooter>
                </form>
            </PopoverContent>
        </PopoverRoot>
    );
};
