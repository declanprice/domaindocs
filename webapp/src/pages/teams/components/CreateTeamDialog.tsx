import { Button, ButtonGroup, Stack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { FormTextInput } from '../../../components/form/FormTextInput';
import { CreateTeamData } from '@domaindocs/types';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { DialogBody, DialogContent, DialogFooter, DialogHeader, DialogRoot } from '../../../components/ui/dialog';
import { OpenChangeDetails } from '@zag-js/dialog';

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
        <DialogRoot
            open={isOpen}
            onOpenChange={(details: OpenChangeDetails) => {
                if (!details.open) {
                    closeAndReset();
                }
            }}
            isCentered
            size={'lg'}
        >
            <DialogContent>
                <form onSubmit={form.handleSubmit(submit)}>
                    <DialogHeader>Create a new team.</DialogHeader>
                    <DialogBody>
                        <Stack gap={4}>
                            <FormTextInput name={'name'} control={form.control} placeholder={'Team name'} />
                        </Stack>
                    </DialogBody>
                    <DialogFooter>
                        <ButtonGroup>
                            <Button onClick={closeAndReset} colorPalette={'red'} disabled={form.formState.isSubmitting}>
                                Cancel
                            </Button>
                            <Button
                                colorPalette={'gray'}
                                variant={'solid'}
                                type={'submit'}
                                disabled={form.formState.isSubmitting}
                            >
                                Create Team
                            </Button>
                        </ButtonGroup>
                    </DialogFooter>
                </form>
            </DialogContent>
        </DialogRoot>
    );
};
