import { Button, ButtonGroup, Dialog } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { CreateWorkAreaData } from '@domaindocs/types';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { workApi } from '../../../state/api/workApi';
import { FormTextInput } from '../../../components/form/FormTextInput';
import { toaster } from '../../../components/ui/toaster';

type AddWorkAreaModalProps = {
    domainId: string;
    isOpen: boolean;
    onClose: () => void;
    onAddWorkArea: () => void;
};

export const AddWorkAreaModal = (props: AddWorkAreaModalProps) => {
    const { domainId, isOpen, onClose, onAddWorkArea } = props;

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
            toaster.create({
                title: 'Success',
                colorScheme: 'green',
                position: 'top',
            });
            close();
        } catch (error) {
            toaster.create({
                title: 'Something went wrong',
                colorScheme: 'red',
                position: 'top',
            });
        }
    };

    return (
        <Dialog.Root isOpen={isOpen} onClose={close}>
            <Dialog.Content>
                <Dialog.Header>Add new work area</Dialog.Header>

                <form onSubmit={form.handleSubmit(submit)}>
                    <Dialog.Body>
                        <FormTextInput
                            name={'name'}
                            control={form.control}
                            label={'Area name'}
                            placeholder={'Team Orion'}
                        />
                    </Dialog.Body>

                    <Dialog.Footer>
                        <ButtonGroup>
                            <Button
                                onClick={close}
                                size={'xs'}
                                colorScheme={'red'}
                                disabled={form.formState.isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                size={'xs'}
                                colorScheme={'gray'}
                                variant={'solid'}
                                type={'submit'}
                                loading={form.formState.isSubmitting}
                            >
                                Create Work Area
                            </Button>
                        </ButtonGroup>
                    </Dialog.Footer>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    );
};
