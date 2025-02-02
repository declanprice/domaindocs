import { ButtonGroup, Flex, Stack, Text } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { DetailedPerson } from '@domaindocs/types';
import { FormTextArea } from '../../../components/form/FormTextArea';
import { useEditable } from '../../../hooks/useEditable';
import { CloseIconButton } from '../../../components/buttons/CloseIconButton';
import { CheckIconButton } from '../../../components/buttons/CheckIconButton';
import { peopleApi } from '../../../state/api/people-api';
import { EditPersonAboutMeData } from '../../../../../shared/types/src/person/edit-person-about-me-data';

type PersonAboutMeProps = {
    domainId: string;
    person: DetailedPerson;
};

export const PersonAboutMe = (props: PersonAboutMeProps) => {
    const { domainId, person } = props;

    const editing = useEditable();

    return (
        <Stack spacing={2}>
            <Text fontSize={14}>About Me</Text>

            {editing.isEditing ? (
                <PersonAboutMeForm domainId={domainId} person={person} onClose={editing.onClose} />
            ) : (
                <Flex
                    _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                    py={2}
                    rounded={6}
                    onClick={editing.onEdit}
                >
                    <Text fontSize={12}>{person.person.aboutMe}</Text>
                </Flex>
            )}
        </Stack>
    );
};

type PersonAboutMeFormProps = {
    domainId: string;
    person: DetailedPerson;
    onClose: () => any;
};

export const PersonAboutMeForm = (props: PersonAboutMeFormProps) => {
    const { domainId, person, onClose } = props;

    const form = useForm({
        values: {
            description: person.person.description,
        },
    });

    const { mutateAsync: updateAboutMe } = useMutation<void, any, EditPersonAboutMeData>({
        mutationFn: (data) => peopleApi.updateAboutMe(domainId, person.person.userId, data),
    });

    const close = () => {
        form.reset();
        onClose();
    };

    const submit = async (data: EditPersonAboutMeData) => {
        await updateAboutMe(data);
        close();
    };

    return (
        <form onSubmit={form.handleSubmit(submit)}>
            <Flex alignItems={'center'} direction={'column'} gap={1}>
                <FormTextArea name={'aboutMe'} control={form.control} />
                <ButtonGroup ml={'auto'}>
                    <CloseIconButton variant={'solid'} onClick={close} isDisabled={form.formState.isSubmitting} />
                    <CheckIconButton variant={'solid'} type={'submit'} isLoading={form.formState.isSubmitting} />
                </ButtonGroup>
            </Flex>
        </form>
    );
};
