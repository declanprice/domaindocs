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
} from '@chakra-ui/react';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { maxLength, minLength, object, string } from 'valibot';
import { FormTextInput } from '../../../components/form/FormInput';
import { FormTextArea } from '../../../components/form/FormTextArea';

type NoteStepField = {
    id?: string;
    name: string;
    note: string;
};

type FormNoteGuideStepProps = {
    isOpen: boolean;
    onClose: () => void;
    activeField?: NoteStepField;
    onSubmit: (note: NoteStepField) => void;
};

export const FormNoteGuideStep = (props: FormNoteGuideStepProps) => {
    const { isOpen, onClose, activeField, onSubmit } = props;

    const form = useForm({
        values: {
            id: activeField ? activeField.id : undefined,
            name: activeField ? activeField.name : '',
            note: activeField ? activeField.note : '',
        },
        resolver: valibotResolver(
            object({
                name: string([minLength(1, 'Note must be at least 1 character')]),
                note: string([
                    minLength(1, 'Note must be at least 1 character'),
                    maxLength(255, 'Note must be less than 255 characters'),
                ]),
            }),
        ),
    });

    const closeModal = () => {
        form.reset();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={'lg'}>
            <ModalOverlay />

            <ModalContent>
                <ModalHeader>Add Note Step</ModalHeader>

                <ModalBody>
                    <FormTextInput size={'sm'} name={'name'} control={form.control} label={'Step name'} />

                    <FormTextArea mt={2} size={'sm'} name={'note'} control={form.control} label={'Note'} />
                </ModalBody>

                <ModalFooter>
                    <ButtonGroup>
                        <Button onClick={closeModal} size={'xs'} colorScheme={'red'}>
                            Cancel
                        </Button>

                        <Button
                            size={'xs'}
                            colorScheme={'gray'}
                            variant={'solid'}
                            isDisabled={!form.formState.isValid}
                            onClick={() => {
                                form.handleSubmit((field) => onSubmit(field))();
                                closeModal();
                            }}
                        >
                            Add Note
                        </Button>
                    </ButtonGroup>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
