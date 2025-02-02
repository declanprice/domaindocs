import { useForm } from 'react-hook-form';
import { Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import debounce from 'debounce';
import { DefaultError, useMutation, useQuery } from '@tanstack/react-query';
import { DetailedSubdomain, UpdateNameData } from '@domaindocs/types';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { FormTextInput } from '../../components/form/FormTextInput';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { ConfirmDialog } from '../../components/dialogs/ConfirmDialog';
import { Avatar } from '../../components/ui/avatar';
import { subdomainsApi } from '../../state/api/subdomains-api';
import { SubdomainPageParams } from '../../types/SubdomainPageParams';
import { apiErrorToast, apiSuccessToast } from '../../util/toasts';

export const SubdomainSettingsPage = () => {
    const { domainId, subdomainId } = useParams() as SubdomainPageParams;

    const deleteModal = useDisclosure();

    const { data: subdomainData, isLoading } = useQuery<DetailedSubdomain>({
        queryKey: ['getSubdomain', { domainId, subdomainId }],
        queryFn: () => subdomainsApi.get(domainId, subdomainId),
    });

    const { mutateAsync: updateSubdomainName } = useMutation<void, DefaultError, UpdateNameData>({
        mutationFn: (data) => subdomainsApi.updateName(domainId, subdomainId, data),
        onError: apiErrorToast,
        onSuccess: () => apiSuccessToast('Successfully updated name'),
    });

    const { mutateAsync: removeSubdomain } = useMutation({
        mutationFn: () => subdomainsApi.remove(domainId, subdomainId),
        onError: apiErrorToast,
        onSuccess: () => apiSuccessToast('Successfully removed subdomain'),
    });

    const form = useForm<UpdateNameData>({
        values: {
            name: subdomainData?.subdomain.name || '',
        },
        resolver: classValidatorResolver(UpdateNameData),
    });

    const onUpdateName = async (data: UpdateNameData) => {
        if (subdomainData?.subdomain.name !== data.name) {
            await updateSubdomainName(data);
        }
    };

    if (!subdomainData || isLoading) return <LoadingContainer />;

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
                        name={'name'}
                        control={form.control}
                        onChange={debounce(() => {
                            form.handleSubmit(onUpdateName)();
                        }, 500)}
                    />
                </Flex>
            </Flex>

            <Flex borderBottom={'1px solid'} borderColor={'border'} pb={35} px={4} pt={6}>
                <Flex width={'280px'} minWidth={'280px'} gap={4} direction={'column'}>
                    <Text fontSize={16}>Danger Area</Text>
                    <Text fontSize={14}>
                        Warning removing an subdomain is irreversible, you will lose all data relating to the domain.
                    </Text>
                </Flex>

                <Flex direction={'column'} ml={20}>
                    <Button colorPalette={'red'} onClick={deleteModal.onOpen}>
                        Remove Subdomain
                    </Button>
                </Flex>

                <ConfirmDialog
                    isOpen={deleteModal.open}
                    onConfirm={removeSubdomain}
                    onClose={deleteModal.onClose}
                    header={'Remove subdomain?'}
                    body={'This action is permanent, you will lose all data relating to this subdomain.'}
                />
            </Flex>
        </Flex>
    );
};
