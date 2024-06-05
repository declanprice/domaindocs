import { useForm } from 'react-hook-form';

import {
    Button,
    ButtonGroup,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
} from '@chakra-ui/react';

import { useState } from 'react';
import { FormTextInput } from '../../../components/form/FormTextInput';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { AddProjectOwnershipData, DetailedTeam, ProjectOwnership, ProjectTeamOwnership, Role } from '@domaindocs/types';
import { DefaultError, useMutation, useQuery } from '@tanstack/react-query';
import { teamsApi } from '../../../state/api/teams-api';
import { projectsApi } from '../../../state/api/projects-api';
import { FormSelect } from '../../../components/form/FormSelect';
import { LoadingContainer } from '../../../components/loading/LoadingContainer';
import { chakraComponents } from 'chakra-react-select';
import { TeamAvatar } from '../../../components/team/TeamAvatar';

export type AddTeamOwnershipProps = {
    domainId: string;
    projectId: string;
    isOpen: boolean;
    ownership: ProjectOwnership[];
    onClose: () => void;
    onSubmit: () => void;
};

type AddTeamOwnershipForm = {
    teamId:
        | {
              label: string;
              value: string;
          }
        | undefined;
    description: string;
};

export const AddTeamOwnership = (props: AddTeamOwnershipProps) => {
    const { domainId, projectId, isOpen, ownership, onSubmit, onClose } = props;

    const [isAdding, setIsAdding] = useState(false);

    const { data: allTeams, isLoading } = useQuery<DetailedTeam[]>({
        queryKey: ['searchTeams', { domainId }],
        queryFn: () => teamsApi.search(domainId, {}),
    });

    const { mutateAsync: addOwnership } = useMutation<void, DefaultError, AddProjectOwnershipData>({
        mutationKey: ['addTeamOwnership', { domainId }],
        mutationFn: async (data) => {
            return projectsApi.addOwnership(domainId, projectId, data);
        },
    });

    const { control, handleSubmit, formState, reset } = useForm<AddTeamOwnershipForm>({
        values: {
            teamId: undefined,
            description: '',
        },
    });

    const closeAndReset = () => {
        reset();
        onClose();
    };

    const submitForm = async (form: AddTeamOwnershipForm) => {
        try {
            setIsAdding(true);
            await addOwnership({
                teamId: form.teamId?.value,
                description: form.description,
            });
            onSubmit();
            closeAndReset();
        } finally {
            setIsAdding(false);
        }
    };

    if (!allTeams || isLoading) return <LoadingContainer />;

    return (
        <Modal isOpen={isOpen} onClose={closeAndReset} isCentered size={'lg'}>
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={handleSubmit(submitForm)}>
                    <ModalHeader>Add Team Ownership</ModalHeader>
                    <ModalBody>
                        <Stack gap={4}>
                            <FormSelect
                                name={'teamId'}
                                control={control}
                                isMulti={false}
                                options={allTeams
                                    .map((t) => ({
                                        value: t.team.teamId,
                                        label: t.team.name,
                                        team: t.team,
                                    }))
                                    .filter(
                                        (t) => !ownership.some((o) => (o as ProjectTeamOwnership)?.teamId === t.value),
                                    )}
                                components={{
                                    Option: (props) => {
                                        const { team } = props.data;

                                        return (
                                            <chakraComponents.Option key={team.teamId} {...props}>
                                                <TeamAvatar name={team.name} iconUri={team.iconUri} small />
                                            </chakraComponents.Option>
                                        );
                                    },
                                }}
                            />

                            <FormTextInput
                                label={'Description'}
                                name={'description'}
                                placeholder={'Eg: API Development'}
                                control={control}
                            />
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <ButtonGroup>
                            <Button onClick={closeAndReset} size={'xs'} colorScheme={'red'}>
                                Cancel
                            </Button>
                            <Button
                                size={'xs'}
                                colorScheme={'gray'}
                                variant={'solid'}
                                isDisabled={!formState.isValid || isAdding}
                                isLoading={isAdding}
                                type={'submit'}
                            >
                                Add Ownership
                            </Button>
                        </ButtonGroup>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};
