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
import { useQuery } from '@tanstack/react-query';
import { Documentation, DocumentationType } from '@domaindocs/lib';
import { documentationApi } from '../../../state/api/documentation-api';
import { LoadingContainer } from '../../../components/loading/LoadingContainer';
import { DocumentationViewer } from '../../../components/documentation/DocumentationViewer';
import { DocumentationNavigator } from '../../../components/documentation/navigator/DocumentationNavigator';
import { useState } from 'react';

type DocumentationStepField = {
    name: string;
    documentationId: string;
};

type FormDocumentationStepProps = {
    domainId: string;
    isOpen: boolean;
    onClose: () => void;
    activeField?: DocumentationStepField;
    onSubmit: (note: DocumentationStepField) => void;
};

export const FormDocumentationStep = (props: FormDocumentationStepProps) => {
    const { domainId, isOpen, onClose, activeField, onSubmit } = props;

    const [activeDocumentation, setActiveDocumentation] = useState<Documentation>();

    const form = useForm({
        values: {
            documentationId: activeField ? activeField.documentationId : '',
            name: activeField ? activeField.name : '',
        },
        resolver: valibotResolver(
            object({
                documentationId: string([minLength(1)]),
                name: string([minLength(1)]),
            }),
        ),
    });

    const {
        data: documentation,
        isLoading: isDocumentationLoading,
        refetch: searchDocumentation,
    } = useQuery<Documentation[]>({
        queryKey: ['searchDocumentation', { domainId }],
        queryFn: () => documentationApi.search(domainId, {}),
    });

    if (!documentation || isDocumentationLoading) return <LoadingContainer />;

    const closeModal = () => {
        form.reset();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={'lg'}>
            <ModalOverlay />

            <ModalContent>
                <ModalHeader>Select Documentation</ModalHeader>

                <ModalBody>
                    <DocumentationNavigator
                        documentation={documentation}
                        activeDocumentation={activeDocumentation}
                        onDocumentationClick={(documentation) => {
                            setActiveDocumentation(documentation);
                            form.setValue('name', documentation.name);
                            form.setValue('documentationId', documentation.documentationId);
                            form.trigger();
                        }}
                    />
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
                            Add Documentation
                        </Button>
                    </ButtonGroup>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
