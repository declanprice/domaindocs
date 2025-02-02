import { Box, Button, Flex, HStack, IconButton, Text, useDisclosure } from '@chakra-ui/react';
import { DomainInvite, PagedResult } from '@domaindocs/types';
import { TbDots } from 'react-icons/tb';
import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import { BiSearch } from 'react-icons/bi';
import debounce from 'debounce';
import { useForm } from 'react-hook-form';
import { Avatar } from '../../../components/ui/avatar';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '../../../components/ui/menu';
import { FormTextInput } from '../../../components/form/FormTextInput';
import {
    PaginationItems,
    PaginationNextTrigger,
    PaginationPrevTrigger,
    PaginationRoot,
} from '../../../components/ui/pagination';
import { InvitePersonModal } from '../../../components/person/InvitePersonModal';
import { domainsApi } from '../../../state/api/domains-api';
import { usePaging } from '../../../hooks/usePaging';
import { LoadingContainer } from '../../../components/loading/LoadingContainer';
import { ConfirmDialog } from '../../../components/dialogs/ConfirmDialog';
import { toaster } from '../../../components/ui/toaster';
import { format } from 'date-fns';
import { apiErrorToast } from '../../../util/toasts';

type DomainInvitesListProps = {
    domainId: string;
};

export const DomainInvitesList = (props: DomainInvitesListProps) => {
    const { domainId } = props;

    const inviteModal = useDisclosure();
    const resendConfirmModal = useDisclosure();
    const removeConfirmModal = useDisclosure();

    const searchInvitesForm = useForm<any>({
        values: {
            search: '',
        },
    });

    const pagination = usePaging();

    const {
        data: invitesData,
        isLoading: isInvitesLoading,
        refetch: searchInvites,
    } = useQuery<PagedResult<DomainInvite>>({
        queryKey: [
            'searchDomainInvites',
            {
                domainId,
                page: pagination.page,
                pageSize: pagination.pageSize,
                search: searchInvitesForm.getValues('search'),
            },
        ],
        queryFn: async () => {
            const result = await domainsApi.searchInvites(domainId, {
                search: searchInvitesForm.getValues('search'),
                take: pagination.pageSize,
                offset: (pagination.page - 1) * pagination.pageSize,
            });
            pagination.setCount(result.total);
            return result;
        },
    });

    const { mutateAsync: removeInvite } = useMutation({
        mutationFn: (email: string) => domainsApi.removeInvite(domainId, email),
        onError: apiErrorToast,
    });

    const { mutateAsync: resendInvite } = useMutation({
        mutationFn: (email: string) => domainsApi.resendInvite(domainId, email),
        onError: apiErrorToast,
    });

    return (
        <Flex direction={'column'} gap={2}>
            <Flex gap={2} mb={2}>
                <FormTextInput
                    leftIcon={<BiSearch color="gray.900" />}
                    name={'search'}
                    placeholder={'Search invites'}
                    control={searchInvitesForm.control}
                    onChange={debounce(() => {
                        searchInvites().then();
                    }, 250)}
                />

                <Box>
                    <Button
                        onClick={() => {
                            inviteModal.onOpen();
                        }}
                    >
                        Invite
                    </Button>
                </Box>
            </Flex>

            {!invitesData || isInvitesLoading ? (
                <Box p={2}>
                    <LoadingContainer height={'40px'} width={'40px'} />
                </Box>
            ) : (
                <ul>
                    {invitesData.data.map((data) => (
                        <li key={data.email}>
                            <Flex
                                p={1}
                                rounded={4}
                                alignItems={'center'}
                                gap={2}
                                mt={2}
                                _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                            >
                                <Avatar name={`${data.email}`} />

                                <Flex direction={'column'} justifyContent={'center'} ml={2} gap={0.5}>
                                    <Text>{data.email}</Text>

                                    <Text fontSize={14} fontWeight={400}>
                                        Invite sent on {format(data.dateSent, 'Mo MMM yyyy')}
                                    </Text>
                                </Flex>

                                <MenuRoot>
                                    <MenuTrigger variant={'ghost'} ml={'auto'} as={IconButton} mr={1}>
                                        <TbDots />
                                    </MenuTrigger>

                                    <MenuContent>
                                        <MenuItem value={'resend'} onClick={resendConfirmModal.onOpen}>
                                            Resend
                                        </MenuItem>
                                        <MenuItem value={'remove'} onClick={removeConfirmModal.onOpen}>
                                            Remove
                                        </MenuItem>
                                    </MenuContent>
                                </MenuRoot>

                                <ConfirmDialog
                                    header={'Resend Invite'}
                                    body={'Are you sure you want to send another invite email?'}
                                    isOpen={resendConfirmModal.open}
                                    onConfirm={async () => {
                                        await resendInvite(data.email);
                                    }}
                                    onClose={resendConfirmModal.onClose}
                                />

                                <ConfirmDialog
                                    header={'Remove Invite'}
                                    body={'Are you sure you want to delete pending invite?'}
                                    isOpen={removeConfirmModal.open}
                                    onConfirm={async () => {
                                        await removeInvite(data.email);
                                    }}
                                    onClose={removeConfirmModal.onClose}
                                />
                            </Flex>
                        </li>
                    ))}
                </ul>
            )}

            <PaginationRoot
                ml={'auto'}
                mt={2}
                count={pagination.count}
                pageSize={pagination.pageSize}
                defaultPage={pagination.page}
                variant={'solid'}
                onPageChange={(details: { page: number }) => {
                    pagination.setPage(details.page);
                }}
            >
                <HStack>
                    <PaginationPrevTrigger />
                    <PaginationItems />
                    <PaginationNextTrigger />
                </HStack>
            </PaginationRoot>

            <InvitePersonModal
                domainId={domainId}
                isOpen={inviteModal.open}
                onClose={inviteModal.onClose}
                onInviteSent={() => {}}
            />
        </Flex>
    );
};
