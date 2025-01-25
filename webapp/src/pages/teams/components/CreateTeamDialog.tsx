import { Button, ButtonGroup, Dialog, Stack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { FormTextInput } from '../../../components/form/FormTextInput';
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
        <Dialog.Root isOpen={isOpen} onClose={closeAndReset} isCentered size={'lg'}>
            <Dialog.Content>
                <form onSubmit={form.handleSubmit(submit)}>
                    <Dialog.Header>Create a new team.</Dialog.Header>
                    <Dialog.Body>
                        <Stack gap={4}>
                            <FormTextInput
                                label={'Team Name'}
                                name={'name'}
                                control={form.control}
                                placeholder={'Name of team'}
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
                                Create Team
                            </Button>
                        </ButtonGroup>
                    </Dialog.Footer>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    );
};
