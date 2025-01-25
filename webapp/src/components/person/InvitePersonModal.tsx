import { Button, ButtonGroup, Dialog } from '@chakra-ui/react';
import { FormTextInput } from '../form/FormTextInput';
import { useForm } from 'react-hook-form';
import { DefaultError, useMutation } from '@tanstack/react-query';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { SendDomainInviteData } from '@domaindocs/types';
import { domainsApi } from '../../state/api/domains-api';
import { toaster } from '../ui/toaster';

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
        <Dialog.Root isOpen={isOpen} onClose={close} isCentered>
            <form onSubmit={form.handleSubmit(sendInvite)}>
                <Dialog.Content>
                    <Dialog.Header title="Send an invite">Send an invite </Dialog.Header>

                    <Dialog.Body>
                        <FormTextInput
                            name={'email'}
                            control={form.control}
                            label={'Email'}
                            placeholder={'johndoe@email.com'}
                        />
                    </Dialog.Body>

                    <Dialog.Footer>
                        <ButtonGroup>
                            <Button size="sm" colorScheme={'red'} onClick={close}>
                                Cancel
                            </Button>

                            <Button size="sm" type={'submit'}>
                                Send Invite
                            </Button>
                        </ButtonGroup>
                    </Dialog.Footer>
                </Dialog.Content>
            </form>
        </Dialog.Root>
    );
};
