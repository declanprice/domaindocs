import { useParams } from 'react-router-dom';
import { TeamPageParams } from './TeamPageParams';
import { DefaultError, useMutation, useQuery } from '@tanstack/react-query';
import { DetailedTeam, UpdateNameData } from '@domaindocs/types';
import { teamsApi } from '../../state/api/teams-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { FormTextInput } from '../../components/form/FormTextInput';
import { useForm } from 'react-hook-form';
import debounce from 'debounce';
import { ConfirmDialog } from '../../components/dialogs/ConfirmDialog';
import React from 'react';
import { apiErrorToast, apiSuccessToast } from '../../util/toasts';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

export const TeamSettingsPage = () => {
    const { domainId, teamId } = useParams() as TeamPageParams;

    const removeModal = useDisclosure();

    const { data: team, isLoading } = useQuery<DetailedTeam>({
        queryKey: ['getTeam', { domainId, teamId }],
        queryFn: () => teamsApi.get(domainId, teamId),
    });

    const { mutateAsync: updateSubdomainName } = useMutation<void, DefaultError, UpdateNameData>({
        mutationFn: (data) => teamsApi.updateName(domainId, teamId, data),
        onError: apiErrorToast,
        onSuccess: () => apiSuccessToast('Successfully updated name'),
    });

    const { mutateAsync: removeSubdomain } = useMutation({
        mutationFn: () => teamsApi.remove(domainId, teamId),
        onError: apiErrorToast,
        onSuccess: () => apiSuccessToast('Successfully removed team'),
    });

    const form = useForm<UpdateNameData>({
        values: {
            name: team?.team.name || '',
        },
        resolver: classValidatorResolver(UpdateNameData),
    });

    const onUpdateName = async (data: UpdateNameData) => {
        if (team?.team.name !== data.name) {
            await updateSubdomainName(data);
        }
    };

    if (!team || isLoading) return <LoadingContainer />;

    return (
        <Flex gap={4} width={'100%'} direction={'column'} overflowY={'auto'}>
            <Flex borderBottom={'1px solid'} borderColor={'border'} pb={30} px={4} pt={6}>
                <Flex width={'280px'} minWidth={'280px'} gap={4} direction={'column'}>
                    <Text fontSize={16}>Team Settings</Text>
                    <Text fontSize={14}>Configure your team name.</Text>
                </Flex>

                <Flex direction={'column'} gap={4} minWidth={'250px'} ml={20}>
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
                        Warning removing an team is irreversible, you will lose all data relating to the domain.
                    </Text>
                </Flex>

                <Flex direction={'column'} ml={20}>
                    <Button colorPalette={'red'} onClick={removeModal.onOpen}>
                        Remove Team
                    </Button>
                </Flex>

                <ConfirmDialog
                    isOpen={removeModal.open}
                    onConfirm={removeSubdomain}
                    onClose={removeModal.onClose}
                    header={'Remove team?'}
                    body={'This action is permanent, you will lose all data relating to this team.'}
                />
            </Flex>
        </Flex>
    );
};
