import { useForm } from 'react-hook-form';

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
import { useState } from 'react';
import { FormTextInput } from '../../../components/form/FormInput';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { AddProjectLinkData } from '@domaindocs/lib';
import { DefaultError, useMutation } from '@tanstack/react-query';
import { projectsApi } from '../../../state/api/projects-api';

export type AddResourceLinkDialogProps = {
    domainId: string;
    projectId: string;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
};

export const AddProjectLinkDialog = (props: AddResourceLinkDialogProps) => {
    const { isOpen, domainId, projectId, onClose, onSubmit } = props;

    const [isAdding, setIsAdding] = useState(false);

    const form = useForm<AddProjectLinkData>({
        values: {
            title: '',
            subTitle: '',
            href: '',
            iconUri: '',
        },
        resolver: classValidatorResolver(AddProjectLinkData),
    });

    const { mutateAsync: addProjectLink } = useMutation<void, DefaultError, AddProjectLinkData>({
        mutationKey: ['addProjectLink', { domainId }],
        mutationFn: async (data) => {
            return projectsApi.addLink(domainId, projectId, data);
        },
    });

    const closeAndReset = () => {
        form.reset();
        onClose();
    };

    const handleSubmit = async (link: AddProjectLinkData) => {
        try {
            setIsAdding(true);
            await addProjectLink(link);
            onSubmit();
            closeAndReset();
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={closeAndReset} isCentered size={'lg'}>
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <ModalHeader>Add Project Link</ModalHeader>
                    <ModalBody>
                        <Stack gap={4}>
                            <FormTextInput
                                label={'Title'}
                                name={'title'}
                                placeholder={'Alerts'}
                                control={form.control}
                            />

                            <FormTextInput
                                label={'Subtitle'}
                                name={'subTitle'}
                                placeholder={'Go to alert dashboard'}
                                control={form.control}
                            />

                            <FormTextInput
                                label={'Link text'}
                                name={'href'}
                                placeholder={'https://alerts.com'}
                                control={form.control}
                            />

                            <FormTextInput
                                label={'Icon Url'}
                                name={'iconUri'}
                                control={form.control}
                                placeholder={'https://alerts.com/icons/alert-icon'}
                            />
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <ButtonGroup>
                            <Button onClick={closeAndReset} size={'xs'} colorScheme={'red'}>
                                Cancel
                            </Button>
                            <Button
                                size={'xs'}
                                colorScheme={'gray'}
                                variant={'solid'}
                                isDisabled={!form.formState.isValid || isAdding}
                                isLoading={isAdding}
                                type={'submit'}
                            >
                                Add Link
                            </Button>
                        </ButtonGroup>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};
