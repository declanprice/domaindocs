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
import { FormTextInput } from '../form/FormInput';
import { useForm } from 'react-hook-form';
import { DefaultError, useMutation } from '@tanstack/react-query';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { SendDomainInviteData } from '@domaindocs/types';
import { domainsApi } from '../../state/api/domains-api';

type InvitePersonModalProps = {
    domainId: string;
    isOpen: boolean;
    onClose: () => void;
    onInviteSent: () => void;
};
export const InvitePersonModal = (props: InvitePersonModalProps) => {
    const { domainId, isOpen, onClose, onInviteSent } = props;

    const toast = useToast();

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
            toast({
                title: 'Something went wrong',
                colorScheme: 'red',
                position: 'top',
            });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={close} isCentered>
            <ModalOverlay />

            <form onSubmit={form.handleSubmit(sendInvite)}>
                <ModalContent>
                    <ModalHeader title="Send an invite">Send an invite </ModalHeader>

                    <ModalBody>
                        <FormTextInput
                            name={'email'}
                            control={form.control}
                            label={'Email'}
                            placeholder={'johndoe@email.com'}
                        />
                    </ModalBody>

                    <ModalFooter>
                        <ButtonGroup>
                            <Button size="sm" colorScheme={'red'} onClick={close}>
                                Cancel
                            </Button>

                            <Button size="sm" type={'submit'}>
                                Send Invite
                            </Button>
                        </ButtonGroup>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    );
};
