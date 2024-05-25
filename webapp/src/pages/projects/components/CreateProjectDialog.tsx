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
import { CreateProjectData } from '@domaindocs/types';
import { FormTextInput } from '../../../components/form/FormInput';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

export type CreateProjectDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    onProjectCreate: (team: CreateProjectData) => Promise<void>;
};

export const CreateProjectDialog = (props: CreateProjectDialogProps) => {
    const { isOpen, onClose, onProjectCreate } = props;

    const form = useForm<CreateProjectData>({
        values: {
            name: '',
        },
        resolver: classValidatorResolver(CreateProjectData),
    });

    const closeAndReset = () => {
        form.reset();
        onClose();
    };

    const submit = async (data: CreateProjectData) => {
        await onProjectCreate(data);
        closeAndReset();
    };

    return (
        <Modal isOpen={isOpen} onClose={closeAndReset} isCentered size={'lg'}>
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={form.handleSubmit(submit)}>
                    <ModalHeader>Create a new project.</ModalHeader>
                    <ModalBody>
                        <Stack gap={4}>
                            <FormTextInput
                                label={'Project Name'}
                                name={'name'}
                                control={form.control}
                                placeholder={'Name of the project'}
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
                                Create Project
                            </Button>
                        </ButtonGroup>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};
