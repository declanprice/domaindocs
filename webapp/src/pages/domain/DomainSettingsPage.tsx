import { useForm } from 'react-hook-form';
import { Button, Flex, Tabs, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { DomainPageParams } from '../../types/DomainPageParams';
import { DefaultError, useMutation, useQuery } from '@tanstack/react-query';
import { domainsApi } from '../../state/api/domains-api';
import { DomainSettings, UpdateDomainNameData } from '@domaindocs/types';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { DomainUserList } from './components/DomainUserList';
import { FormTextInput } from '../../components/form/FormTextInput';
import debounce from 'debounce';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { ConfirmDialog } from '../../components/dialogs/ConfirmDialog';
import { toaster } from '../../components/ui/toaster';
import { Avatar } from '../../components/ui/avatar';
import { IoPersonOutline, IoSendOutline } from 'react-icons/io5';
import { DomainInvitesList } from './components/DomainInvitesList';

export const DomainSettingsPage = () => {
    const { domainId } = useParams() as DomainPageParams;

    const deleteModal = useDisclosure();

    const { data: domain, isLoading } = useQuery<DomainSettings>({
        queryKey: ['getDomainSettings', { domainId }],
        queryFn: () => domainsApi.getSettings(domainId),
    });

    const { mutateAsync: updateName } = useMutation<void, DefaultError, UpdateDomainNameData>({
        mutationKey: ['updateDomainName', { domainId }],
        mutationFn: (data) => domainsApi.updateName(domainId, data),
    });

    const { mutateAsync: deleteDomain } = useMutation({
        mutationKey: ['deleteDomain', { domainId }],
        mutationFn: () => domainsApi.deleteDomain(domainId),
    });

    const form = useForm<UpdateDomainNameData>({
        values: {
            domainName: domain?.domain.name || '',
        },
        resolver: classValidatorResolver(UpdateDomainNameData),
    });

    const onUpdateName = async (data: UpdateDomainNameData) => {
        try {
            if (domain?.domain.name !== data.domainName) {
                await updateName(data);
                toaster.success({
                    title: 'Success',
                    colorScheme: 'green',
                    position: 'top',
                });
            }
        } catch (error) {
            toaster.error({
                title: 'Something went wrong',
                colorScheme: 'red',
                position: 'top',
            });
        }
    };

    const onDeleteDomain = async () => {
        try {
            await deleteDomain();
            toaster.success({
                title: 'Success',
                colorScheme: 'green',
                position: 'top',
            });
            window.location.reload();
        } catch (error) {
            toaster.error({
                title: 'Something went wrong',
                colorScheme: 'red',
                position: 'top',
            });
        }
    };

    if (!domain || isLoading) return <LoadingContainer />;

    return (
        <Flex gap={4} width={'100%'} direction={'column'} overflowY={'auto'}>
            <Flex borderBottom={'1px solid'} borderColor={'border'} pb={30} px={4} pt={6}>
                <Flex width={'280px'} minWidth={'280px'} gap={4} direction={'column'}>
                    <Text fontSize={16}>Domain Settings</Text>
                    <Text fontSize={14}>Configure your domain name, and logo.</Text>
                </Flex>

                <Flex direction={'column'} gap={4} minWidth={'250px'} ml={20}>
                    <Avatar name={'Registers Of Scotland'} size={'lg'} rounded={4} />

                    <FormTextInput
                        name={'domainName'}
                        control={form.control}
                        onChange={debounce(() => {
                            form.handleSubmit(onUpdateName)();
                        }, 500)}
                    />
                </Flex>
            </Flex>

            <Flex borderBottom={'1px solid'} borderColor={'border'} pb={35} px={4} pt={6}>
                <Flex width={'280px'} minWidth={'280px'} gap={4} direction={'column'}>
                    <Text fontSize={16}>Users</Text>
                    <Text fontSize={14}>Manage the users of your domain.</Text>
                </Flex>

                <Tabs.Root defaultValue={'users'} flex={1}>
                    <Tabs.List>
                        <Tabs.Trigger value={'users'}>
                            <IoPersonOutline />
                            Users
                        </Tabs.Trigger>
                        <Tabs.Trigger value={'invites'}>
                            <IoSendOutline />
                            Pending Invites
                        </Tabs.Trigger>
                    </Tabs.List>

                    <Tabs.Content value={'users'}>
                        <DomainUserList domainId={domainId} />
                    </Tabs.Content>

                    <Tabs.Content value={'invites'}>
                        <DomainInvitesList domainId={domainId} />
                    </Tabs.Content>
                </Tabs.Root>
            </Flex>

            <Flex borderBottom={'1px solid'} borderColor={'border'} pb={35} px={4} pt={6}>
                <Flex width={'280px'} minWidth={'280px'} gap={4} direction={'column'}>
                    <Text fontSize={16}>Danger Area</Text>
                    <Text fontSize={14}>
                        Warning deleting an domain is irreversible, you will lose all data relating to the domain.
                    </Text>
                </Flex>

                <Flex direction={'column'} ml={20}>
                    <Button colorPalette={'red'} onClick={deleteModal.onOpen}>
                        Delete Domain
                    </Button>
                </Flex>

                <ConfirmDialog
                    isOpen={deleteModal.open}
                    onConfirm={onDeleteDomain}
                    onClose={deleteModal.onClose}
                    body={'This action is permanent, you will lose all data relating to this domain.'}
                />
            </Flex>
        </Flex>
    );
};
