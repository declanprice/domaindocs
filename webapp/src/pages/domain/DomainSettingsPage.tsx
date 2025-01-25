import { useForm } from 'react-hook-form';
import { Box, Button, Flex, Input, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { DomainPageParams } from '../../types/DomainPageParams';
import { DefaultError, useMutation, useQuery } from '@tanstack/react-query';
import { domainsApi } from '../../state/api/domains-api';
import { DomainSettings, UpdateDomainNameData } from '@domaindocs/types';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { DomainPeopleList } from './components/DomainPeopleList';
import { InvitePersonModal } from '../../components/person/InvitePersonModal';
import { BiSearch } from 'react-icons/bi';
import { FormTextInput } from '../../components/form/FormTextInput';
import debounce from 'debounce';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { ConfirmDialog } from '../../components/dialogs/ConfirmDialog';
import { Pagination } from '../../components/pagination/Pagination';
import { toaster } from '../../components/ui/toaster';
import { Avatar } from '../../components/ui/avatar';
import { InputGroup } from '../../components/ui/input-group';

export const DomainSettingsPage = () => {
    const { domainId } = useParams() as DomainPageParams;

    const deleteModal = useDisclosure();

    const { data: domain, isLoading } = useQuery<DomainSettings>({
        queryKey: ['getDomain', { domainId }],
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

    const inviteModal = useDisclosure();

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
                <Flex width={'280px'} minWidth={'250px'} gap={4} direction={'column'} mr={20}>
                    <Text fontSize={16}>Domain Settings</Text>
                    <Text fontSize={12}>Configure your domain name, and logo.</Text>
                </Flex>

                <Flex direction={'column'} gap={4}>
                    <Avatar name={'Registers Of Scotland'} size={'lg'} rounded={4} />

                    <FormTextInput
                        name={'domainName'}
                        control={form.control}
                        label={'Domain name'}
                        debounce={500}
                        onChange={debounce(() => {
                            form.handleSubmit(onUpdateName)();
                        }, 500)}
                    />
                </Flex>
            </Flex>

            <Flex borderBottom={'1px solid'} borderColor={'border'} pb={35} px={4} pt={6}>
                <Flex width={'280px'} minWidth={'250px'} gap={4} direction={'column'} mr={20}>
                    <Text fontSize={16}>People</Text>
                    <Text fontSize={12}>Manage the people of your domain.</Text>
                </Flex>

                <Flex direction={'column'} width={'100%'} gap={2} maxWidth={'500px'}>
                    <Flex gap={2}>
                        <InputGroup
                            maxWidth={'300px'}
                            startElement={<BiSearch color="gray.900" />}
                            pointerEvents={'none'}
                        >
                            <Input variant={'subtle'} placeholder="Search people" />
                        </InputGroup>

                        <Box>
                            <Button
                                size={'xs'}
                                onClick={() => {
                                    inviteModal.onOpen();
                                }}
                            >
                                Invite
                            </Button>
                        </Box>
                    </Flex>

                    <DomainPeopleList people={domain.people} />

                    <Flex justifyContent={'flex-end'}>
                        <Pagination />
                    </Flex>

                    <InvitePersonModal
                        domainId={domainId}
                        isOpen={inviteModal.open}
                        onClose={inviteModal.onClose}
                        onInviteSent={() => {}}
                    />
                </Flex>
            </Flex>

            <Flex borderBottom={'1px solid'} borderColor={'border'} pb={35} px={4} pt={6}>
                <Flex width={'280px'} minWidth={'250px'} gap={4} direction={'column'} mr={20}>
                    <Text fontSize={16}>Danger Area</Text>
                    <Text fontSize={12}>
                        Warning deleting an domain is irreversible, you will lose all data relating to the domain.
                    </Text>
                </Flex>

                <Flex direction={'column'}>
                    <Button colorScheme={'red'} size={'xs'} onClick={deleteModal.onOpen}>
                        Delete Domain
                    </Button>
                </Flex>

                <ConfirmDialog
                    isOpen={deleteModal.open}
                    onConfirm={onDeleteDomain}
                    onCancel={deleteModal.onClose}
                    body={'This action is permanent, you will lose all data relating to this domain.'}
                />
            </Flex>
        </Flex>
    );
};
