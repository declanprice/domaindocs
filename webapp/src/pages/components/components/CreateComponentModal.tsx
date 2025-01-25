import { Button, ButtonGroup, Dialog, Stack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { ComponentType, CreateComponentData } from '@domaindocs/types';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { FormTextInput } from '../../../components/form/FormTextInput';

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
        <Dialog.Root isOpen={isOpen} onClose={closeAndReset} isCentered size={'lg'}>
            <Dialog.Content>
                <form onSubmit={form.handleSubmit(submit)}>
                    <Dialog.Header>Create a new component.</Dialog.Header>
                    <Dialog.Body>
                        <Stack gap={4}>
                            <FormTextInput
                                label={'Component Name'}
                                name={'name'}
                                control={form.control}
                                placeholder={'Name of the component'}
                            />
                        </Stack>
                    </Dialog.Body>
                    <Dialog.Footer>
                        <ButtonGroup>
                            <Button
                                onClick={closeAndReset}
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
                                disabled={form.formState.isSubmitting}
                            >
                                Create Component
                            </Button>
                        </ButtonGroup>
                    </Dialog.Footer>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    );
};
