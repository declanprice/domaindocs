import { Control, useController, useFieldArray } from 'react-hook-form';
import {
    Button,
    Flex,
    FormControl,
    FormControlProps,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    List,
    ListItem,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { OnboardingGuideStepData, OnboardingStepType } from '@domaindocs/lib';
import { CloseIconButton } from '../../../components/buttons/CloseIconButton';
import { getFontSize } from '../../../util/getFontSize';
import { useState } from 'react';
import { FormNoteGuideStep } from './FormNoteGuideStep';
import { FormDocumentationStep } from './FormDocumentationStep';

export type FormOnboardingGuideStepsProps = {
    domainId: string;
    name: string;
    placeholder?: string;
    control: Control<any>;
    label?: string;
    helperText?: string;
    onChange?: (e: any) => void;
    onBlur?: () => void;
} & Partial<FormControlProps>;

export const FormOnboardingGuideSteps = (props: FormOnboardingGuideStepsProps) => {
    const noteModal = useDisclosure();
    const documentationModal = useDisclosure();

    const [activeField, setActiveField] = useState<any>();

    const { fieldState } = useController({
        control: props.control,
        name: props.name,
    });

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control: props.control,
        name: props.name,
    });

    const renderType = (step: OnboardingGuideStepData) => {
        switch (step.type) {
            case OnboardingStepType.NOTE:
                return 'Read Note';
            case OnboardingStepType.DOCUMENTATION:
                return 'Read Documentation';
            case OnboardingStepType.FILE:
                return 'See File';
        }
    };

    return (
        <FormControl isInvalid={fieldState.invalid} {...props}>
            {props.label && (
                <FormLabel mb={2} fontSize={getFontSize(props.size)}>
                    {props.label}
                </FormLabel>
            )}

            {props.helperText && <FormHelperText fontSize={getFontSize(props.size)}>{props.helperText}</FormHelperText>}

            {fieldState.error && (
                <FormErrorMessage fontSize={getFontSize(props.size)}>{fieldState.error.message}</FormErrorMessage>
            )}

            <List spacing={2}>
                {fields.map((field: any, index) => {
                    return (
                        <ListItem
                            key={field.id}
                            _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                            rounded={4}
                            p={2}
                        >
                            <Flex alignItems={'center'}>
                                <Flex direction={'column'}>
                                    <Text fontSize={getFontSize(props.size)}>{field.name}</Text>
                                    <Text fontSize={getFontSize(props.size) - 2}>{renderType(field)}</Text>
                                </Flex>

                                <CloseIconButton
                                    ml={'auto'}
                                    onClick={() => {
                                        remove(field);
                                    }}
                                />
                            </Flex>
                        </ListItem>
                    );
                })}
            </List>

            <Menu>
                <MenuButton as={Button} mt={4} size={props.size}>
                    New Step
                </MenuButton>

                <MenuList>
                    <MenuItem
                        fontSize={12}
                        onClick={() => {
                            noteModal.onOpen();
                        }}
                    >
                        Note
                    </MenuItem>

                    <MenuItem
                        fontSize={12}
                        onClick={() => {
                            documentationModal.onOpen();
                        }}
                    >
                        Documentation
                    </MenuItem>
                </MenuList>
            </Menu>

            <FormNoteGuideStep
                isOpen={noteModal.isOpen}
                onClose={noteModal.onClose}
                activeField={activeField}
                onSubmit={(field) => {
                    append({
                        type: OnboardingStepType.NOTE,
                        note: field.note,
                        name: field.name,
                    });
                }}
            />

            <FormDocumentationStep
                isOpen={documentationModal.isOpen}
                onClose={documentationModal.onClose}
                domainId={props.domainId}
                activeField={activeField}
                onSubmit={(field) => {
                    append({
                        type: OnboardingStepType.DOCUMENTATION,
                        documentationId: field.documentationId,
                        name: field.name,
                    });
                }}
            />
        </FormControl>
    );
};
