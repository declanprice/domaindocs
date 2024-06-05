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
import { ComponentType, CreateComponentData } from '@domaindocs/types';
import { FormTextInput } from '../../../components/form/FormTextInput';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

export type CreateComponentModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onComponentCreate: (team: CreateComponentData) => Promise<void>;
};

export const CreateComponentModal = (props: CreateComponentModalProps) => {
    const { isOpen, onClose, onComponentCreate } = props;

    const form = useForm<CreateComponentData>({
        values: {
            name: '',
            type: ComponentType.SERVICE,
        },
        resolver: classValidatorResolver(CreateComponentData),
    });

    const closeAndReset = () => {
        form.reset();
        onClose();
    };

    const submit = async (data: CreateComponentData) => {
        await onComponentCreate(data);
        closeAndReset();
    };

    return (
        <Modal isOpen={isOpen} onClose={closeAndReset} isCentered size={'lg'}>
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={form.handleSubmit(submit)}>
                    <ModalHeader>Create a new component.</ModalHeader>
                    <ModalBody>
                        <Stack gap={4}>
                            <FormTextInput
                                label={'Component Name'}
                                name={'name'}
                                control={form.control}
                                placeholder={'Name of the component'}
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
                                Create Component
                            </Button>
                        </ButtonGroup>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};
