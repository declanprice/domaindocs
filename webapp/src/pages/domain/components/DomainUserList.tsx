import { Badge, Box, Button, Flex, HStack, IconButton, Text, useDisclosure } from '@chakra-ui/react';
import { DomainUser, PagedResult } from '@domaindocs/types';
import { TbDots } from 'react-icons/tb';
import React from 'react';
import { Avatar } from '../../../components/ui/avatar';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '../../../components/ui/menu';
import { FormTextInput } from '../../../components/form/FormTextInput';
import { BiSearch } from 'react-icons/bi';
import debounce from 'debounce';
import {
    PaginationItems,
    PaginationNextTrigger,
    PaginationPrevTrigger,
    PaginationRoot,
} from '../../../components/ui/pagination';
import { InvitePersonModal } from '../../../components/person/InvitePersonModal';
import { useQuery } from '@tanstack/react-query';
import { domainsApi } from '../../../state/api/domains-api';
import { useForm } from 'react-hook-form';
import { usePaging } from '../../../hooks/usePaging';
import { LoadingContainer } from '../../../components/loading/LoadingContainer';

type DomainUserListProps = {
    domainId: string;
};

export const DomainUserList = (props: DomainUserListProps) => {
    const { domainId } = props;

    const inviteModal = useDisclosure();

    const searchUsersForm = useForm<any>({
        values: {
            search: '',
        },
    });

    const pagination = usePaging();

    const {
        data: searchUsersResult,
        isFetching: isUsersFetching,
        refetch: searchUsers,
    } = useQuery<PagedResult<DomainUser>>({
        queryKey: [
            'searchDomainUsers',
            {
                domainId,
                page: pagination.page,
                pageSize: pagination.pageSize,
                search: searchUsersForm.getValues('search'),
            },
        ],
        queryFn: async () => {
            const result = await domainsApi.searchPeople(domainId, {
                search: searchUsersForm.getValues('search'),
                take: pagination.pageSize,
                offset: (pagination.page - 1) * pagination.pageSize,
            });
            pagination.setCount(result.total);
            return result;
        },
    });

    return (
        <Flex direction={'column'} width={'100%'} gap={2} ml={20}>
            <Flex gap={2} mb={2}>
                <FormTextInput
                    leftIcon={<BiSearch color="gray.900" />}
                    name={'search'}
                    placeholder={'Search users'}
                    control={searchUsersForm.control}
                    onChange={debounce(() => {
                        searchUsers().then();
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

            {!searchUsersResult || isUsersFetching ? (
                <LoadingContainer />
            ) : (
                <ul>
                    {searchUsersResult.data.map((data) => (
                        <li key={data.userId}>
                            <Flex
                                p={1}
                                rounded={4}
                                alignItems={'center'}
                                gap={2}
                                mt={2}
                                _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                            >
                                <Avatar src={data.iconUri} name={`${data.firstName} ${data.lastName}`} />

                                <Flex direction={'column'} justifyContent={'center'} ml={2}>
                                    <Text fontWeight={'normal'}>
                                        {data.firstName} {data.lastName}
                                        {data.invitePending && (
                                            <Badge ml="2" colorScheme="orange">
                                                Invited
                                            </Badge>
                                        )}
                                    </Text>

                                    <Text>{data.email}</Text>
                                </Flex>

                                <MenuRoot>
                                    <MenuTrigger variant={'ghost'} ml={'auto'} as={IconButton} mr={1}>
                                        <TbDots />
                                    </MenuTrigger>

                                    <MenuContent>
                                        <MenuItem>Remove</MenuItem>
                                    </MenuContent>
                                </MenuRoot>
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
