import { ButtonGroup, Flex, Stack, Text } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Domain, EditDomainDescriptionData } from '@domaindocs/types';
import { FormTextArea } from '../../../components/form/FormTextArea';
import { useEditable } from '../../../hooks/useEditable';
import { CloseIconButton } from '../../../components/buttons/CloseIconButton';
import { CheckIconButton } from '../../../components/buttons/CheckIconButton';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { domainsApi } from '../../../state/api/domains-api';

type DomainDescriptionProps = {
    domain: Domain;
};

export const DomainDescription = (props: DomainDescriptionProps) => {
    const { domain } = props;

    const editing = useEditable();

    return (
        <Stack gap={2}>
            <Text fontSize={16}>Description</Text>

            {editing.isEditing ? (
                <DomainDescriptionForm domain={domain} onClose={editing.onClose} />
            ) : (
                <Flex
                    _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                    py={2}
                    rounded={6}
                    onClick={editing.onEdit}
                >
                    <Text fontSize={14}>
                        {domain.description == '' ? 'Add a domain description' : domain.description}
                    </Text>
                </Flex>
            )}
        </Stack>
    );
};

type DomainDescriptionFormProps = {
    domain: Domain;
    onClose: () => any;
};

export const DomainDescriptionForm = (props: DomainDescriptionFormProps) => {
    const { domain, onClose } = props;

    const form = useForm<EditDomainDescriptionData>({
        values: {
            description: domain.description,
        },
        resolver: classValidatorResolver(EditDomainDescriptionData),
    });

    const { mutateAsync: updateDescription } = useMutation<void, any, EditDomainDescriptionData>({
        mutationFn: (data) => domainsApi.updateDescription(domain.domainId, data),
    });

    const close = () => {
        form.reset();
        onClose();
    };

    const submit = async (data: EditDomainDescriptionData) => {
        await updateDescription(data);
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
