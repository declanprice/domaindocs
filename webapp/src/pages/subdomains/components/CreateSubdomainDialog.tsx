import { Button, ButtonGroup, Dialog, Stack, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { FormTextInput } from '../../../components/form/FormTextInput';
import { CreateSubdomainData } from '@domaindocs/types';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { DialogBody, DialogContent, DialogFooter, DialogHeader, DialogRoot } from '../../../components/ui/dialog';
import { OpenChangeDetails } from '@zag-js/dialog';

export type CreateSubdomainDialog = {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
    onCreateSubdomain: (data: CreateSubdomainData) => Promise<void>;
};

export const CreateSubdomainDialog = (props: CreateSubdomainDialog) => {
    const { isOpen, onClose, onOpen, onCreateSubdomain } = props;

    const form = useForm<CreateSubdomainData>({
        values: {
            name: '',
        },
        resolver: classValidatorResolver(CreateSubdomainData),
    });

    const closeAndReset = () => {
        form.reset();
        onClose();
    };

    const submit = async (data: CreateSubdomainData) => {
        await onCreateSubdomain(data);
        closeAndReset();
    };

    return (
        <DialogRoot
            open={isOpen}
            onOpenChange={(details: OpenChangeDetails) => {
                details.open ? onOpen() : onClose();
            }}
            isCentered
            size={'lg'}
        >
            <DialogContent>
                <form onSubmit={form.handleSubmit(submit)}>
                    <DialogHeader>
                        <Text textStyle={'lg'}>Create a new subdomain.</Text>
                    </DialogHeader>
                    <DialogBody>
                        <Stack gap={4}>
                            <FormTextInput name={'name'} control={form.control} placeholder={'Subdomain name'} />
                        </Stack>
                    </DialogBody>
                    <DialogFooter>
                        <ButtonGroup>
                            <Button onClick={closeAndReset} colorPalette={'red'} disabled={form.formState.isSubmitting}>
                                Cancel
                            </Button>
                            <Button colorPalette={'gray'} type={'submit'} loading={form.formState.isSubmitting}>
                                Create Subdomain
                            </Button>
                        </ButtonGroup>
                    </DialogFooter>
                </form>
            </DialogContent>
        </DialogRoot>
    );
};
