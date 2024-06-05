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
import { AddProjectOwnershipData, DetailedPerson, ProjectOwnership, ProjectPersonOwnership } from '@domaindocs/types';
import { DefaultError, useMutation, useQuery } from '@tanstack/react-query';
import { projectsApi } from '../../../state/api/projects-api';
import { FormSelect } from '../../../components/form/FormSelect';
import { LoadingContainer } from '../../../components/loading/LoadingContainer';
import { peopleApi } from '../../../state/api/people-api';
import { chakraComponents } from 'chakra-react-select';
import { PersonAvatar } from '../../../components/person/PersonAvatar';

export type AddPersonOwnershipProps = {
    domainId: string;
    projectId: string;
    isOpen: boolean;
    ownership: ProjectOwnership[];
    onClose: () => void;
    onSubmit: () => void;
};

type AddPersonOwnershipForm = {
    userId:
        | {
              label: string;
              value: string;
          }
        | undefined;
    description: string;
};

export const AddPersonOwnership = (props: AddPersonOwnershipProps) => {
    const { domainId, projectId, isOpen, ownership, onSubmit, onClose } = props;

    const [isAdding, setIsAdding] = useState(false);

    const { data: allPeople, isLoading } = useQuery<DetailedPerson[]>({
        queryKey: ['searchPeople', { domainId }],
        queryFn: () => peopleApi.search(domainId, {}),
    });

    const { mutateAsync: addOwnership } = useMutation<void, DefaultError, AddProjectOwnershipData>({
        mutationKey: ['addTeamOwnership', { domainId }],
        mutationFn: async (data) => {
            return projectsApi.addOwnership(domainId, projectId, data);
        },
    });

    const { control, handleSubmit, getValues, formState, reset } = useForm<AddPersonOwnershipForm>({
        values: {
            userId: undefined,
            description: '',
        },
    });

    const closeAndReset = () => {
        reset();
        onClose();
    };

    const submitForm = async (form: AddPersonOwnershipForm) => {
        try {
            setIsAdding(true);
            await addOwnership({
                userId: form.userId?.value,
                description: form.description,
            });
            onSubmit();
            closeAndReset();
        } finally {
            setIsAdding(false);
        }
    };

    if (!allPeople || isLoading) return <LoadingContainer />;

    return (
        <Modal isOpen={isOpen} onClose={closeAndReset} isCentered size={'lg'}>
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={handleSubmit(submitForm)}>
                    <ModalHeader>Add Person Ownership</ModalHeader>
                    <ModalBody>
                        <Stack gap={4}>
                            <FormSelect
                                name={'userId'}
                                control={control}
                                isMulti={false}
                                options={allPeople
                                    .map((p) => ({
                                        value: p.person.userId,
                                        label: `${p.person.firstName} ${p.person.lastName}`,
                                        person: p.person,
                                    }))
                                    .filter(
                                        (t) =>
                                            !ownership.some((o) => (o as ProjectPersonOwnership)?.userId === t.value),
                                    )}
                                components={{
                                    Option: (props) => {
                                        const { person } = props.data;

                                        return (
                                            <chakraComponents.Option key={person.userId} {...props}>
                                                <PersonAvatar
                                                    firstName={person.firstName}
                                                    lastName={person.lastName}
                                                    iconUri={person.iconUri}
                                                    extraSmall
                                                />
                                            </chakraComponents.Option>
                                        );
                                    },
                                }}
                            />

                            <FormTextInput
                                label={'Description'}
                                name={'description'}
                                placeholder={'Eg: UI Development'}
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
