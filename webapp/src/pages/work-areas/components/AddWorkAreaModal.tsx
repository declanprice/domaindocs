import {
    Button,
    ButtonGroup,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { CreateWorkAreaData } from '@domaindocs/types';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { workApi } from '../../../state/api/workApi';
import { FormTextInput } from '../../../components/form/FormTextInput';

type AddWorkAreaModalProps = {
    domainId: string;
    isOpen: boolean;
    onClose: () => void;
    onAddWorkArea: () => void;
};

export const AddWorkAreaModal = (props: AddWorkAreaModalProps) => {
    const { domainId, isOpen, onClose, onAddWorkArea } = props;

    const toast = useToast();

    const form = useForm<CreateWorkAreaData>({
        values: {
            name: '',
        },
        resolver: classValidatorResolver(CreateWorkAreaData),
    });

    const addForm = useMutation<void, any, CreateWorkAreaData>({
        mutationKey: ['addWorkArea', { domainId }],
        mutationFn: (data) => workApi().create(domainId, data),
    });

    const close = () => {
        form.reset();
        onClose();
    };

    const submit = async (data: CreateWorkAreaData) => {
        try {
            await addForm.mutateAsync(data);
            toast({
                title: 'Success',
                colorScheme: 'green',
                position: 'top',
            });
            close();
        } catch (error) {
            toast({
                title: 'Something went wrong',
                colorScheme: 'red',
                position: 'top',
            });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={close}>
            <ModalOverlay />

            <ModalContent>
                <ModalHeader>Add new work area</ModalHeader>

                <form onSubmit={form.handleSubmit(submit)}>
                    <ModalBody>
                        <FormTextInput
                            name={'name'}
                            control={form.control}
                            label={'Area name'}
                            placeholder={'Team Orion'}
                        />
                    </ModalBody>

                    <ModalFooter>
                        <ButtonGroup>
                            <Button
                                onClick={close}
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
                                Create Work Area
                            </Button>
                        </ButtonGroup>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};
