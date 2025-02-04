import { Button, ButtonGroup } from '@chakra-ui/react';
import { FormTextInput } from '../form/FormTextInput';
import { useForm } from 'react-hook-form';
import { DefaultError, useMutation } from '@tanstack/react-query';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { SendDomainInviteData } from '@domaindocs/types';
import { domainsApi } from '../../state/api/domains-api';
import { toaster } from '../ui/toaster';
import { DialogContent, DialogRoot, DialogFooter, DialogHeader, DialogBody } from '../ui/dialog';
import { apiErrorToast, apiSuccessToast } from '../../util/toasts';

type InvitePersonModalProps = {
    domainId: string;
    isOpen: boolean;
    onClose: () => void;
    onInviteSent: () => void;
};
export const InvitePersonModal = (props: InvitePersonModalProps) => {
    const { domainId, isOpen, onClose } = props;

    const { mutateAsync } = useMutation<void, DefaultError, SendDomainInviteData>({
        mutationKey: ['sendInvite', { domainId }],
        mutationFn: (data) => domainsApi.sendInvite(domainId, data),
        onSuccess: () => apiSuccessToast('Invite successfully sent to email'),
        onError: apiErrorToast,
    });

    const form = useForm({
        values: {
            email: '',
        },
        resolver: classValidatorResolver(SendDomainInviteData),
    });

    const close = () => {
        form.reset();
        onClose();
    };

    const sendInvite = async (data: SendDomainInviteData) => {
        try {
            await mutateAsync(data);
            close();
        } catch (error) {
            toaster.error({
                title: 'Something went wrong',
                colorScheme: 'red',
                position: 'top',
            });
        }
    };

    return (
        <DialogRoot
            open={isOpen}
            onOpenChange={(details: { open: boolean }) => {
                if (!details.open) {
                    onClose();
                }
            }}
            isCentered
        >
            <DialogContent>
                <form onSubmit={form.handleSubmit(sendInvite)}>
                    <DialogHeader title="Send an invite">Send an invite </DialogHeader>

                    <DialogBody>
                        <FormTextInput
                            name={'email'}
                            control={form.control}
                            label={'Email'}
                            placeholder={'johndoe@email.com'}
                        />
                    </DialogBody>

                    <DialogFooter>
                        <ButtonGroup>
                            <Button colorPalette={'red'} onClick={close} disabled={form.formState.isSubmitting}>
                                Cancel
                            </Button>

                            <Button type={'submit'} loading={form.formState.isSubmitting}>
                                Send Invite
                            </Button>
                        </ButtonGroup>
                    </DialogFooter>
                </form>
            </DialogContent>
        </DialogRoot>
    );
};
