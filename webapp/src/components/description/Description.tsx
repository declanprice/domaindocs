import { ButtonGroup, Flex, Stack, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { EditDescriptionData } from '@domaindocs/types';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useEditable } from '../../hooks/useEditable';
import { FormTextArea } from '../form/FormTextArea';
import { CloseIconButton } from '../buttons/CloseIconButton';
import { CheckIconButton } from '../buttons/CheckIconButton';

type DescriptionProps = {
    placeholder: string;
    description: string;
    onUpdateDescription: (description: EditDescriptionData) => Promise<void>;
};

export const Description = (props: DescriptionProps) => {
    const { description, onUpdateDescription, placeholder } = props;

    const editing = useEditable();

    return (
        <Stack gap={2}>
            {editing.isEditing ? (
                <DescriptionForm
                    description={description}
                    onUpdateDescription={onUpdateDescription}
                    onClose={editing.onClose}
                />
            ) : (
                <Flex
                    _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                    py={2}
                    rounded={6}
                    onClick={editing.onEdit}
                >
                    <Text fontSize={14}>{description == '' ? placeholder : description}</Text>
                </Flex>
            )}
        </Stack>
    );
};

type DescriptionFormProps = {
    description: string;
    onUpdateDescription: (description: EditDescriptionData) => Promise<void>;
    onClose: () => any;
};

export const DescriptionForm = (props: DescriptionFormProps) => {
    const { description, onUpdateDescription, onClose } = props;

    const form = useForm<EditDescriptionData>({
        values: {
            description: description,
        },
        resolver: classValidatorResolver(EditDescriptionData),
    });

    const close = () => {
        form.reset();
        onClose();
    };

    const submit = async (data: EditDescriptionData) => {
        await onUpdateDescription(data);
        close();
    };

    return (
        <form onSubmit={form.handleSubmit(submit)}>
            <Flex alignItems={'center'} direction={'column'} gap={1}>
                <FormTextArea name={'description'} control={form.control} />
                <ButtonGroup ml={'auto'}>
                    <CloseIconButton onClick={close} disabled={form.formState.isSubmitting} />
                    <CheckIconButton type={'submit'} loading={form.formState.isSubmitting} />
                </ButtonGroup>
            </Flex>
        </form>
    );
};
