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
import { useForm } from 'react-hook-form';
import { FormTextInput } from '../../../components/form/FormInput';
import { CreateTeamData } from '@domaindocs/types';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

export type CreateTeamDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    onCreateTeam: (team: CreateTeamData) => Promise<void>;
};

export const CreateTeamDialog = (props: CreateTeamDialogProps) => {
    const { isOpen, onClose, onCreateTeam } = props;

    const form = useForm<CreateTeamData>({
        values: {
            name: '',
        },
        resolver: classValidatorResolver(CreateTeamData),
    });

    const closeAndReset = () => {
        form.reset();
        onClose();
    };

    const submit = async (data: CreateTeamData) => {
        await onCreateTeam(data);
        closeAndReset();
    };

    return (
        <Modal isOpen={isOpen} onClose={closeAndReset} isCentered size={'lg'}>
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={form.handleSubmit(submit)}>
                    <ModalHeader>Create a new team.</ModalHeader>
                    <ModalBody>
                        <Stack gap={4}>
                            <FormTextInput
                                label={'Team Name'}
                                name={'name'}
                                control={form.control}
                                placeholder={'Name of team'}
                            />
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <ButtonGroup>
                            <Button
                                onClick={closeAndReset}
                                size={'xs'}
                                colorScheme={'red'}
                                isDisabled={form.formState.isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                size={'xs'}
                                colorScheme={'gray'}
                                variant={'solid'}
                                type={'submit'}
                                isLoading={form.formState.isSubmitting}
                            >
                                Create Team
                            </Button>
                        </ButtonGroup>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};
