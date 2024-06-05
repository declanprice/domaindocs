import { ButtonGroup, Flex, Stack, Text } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { DetailedPerson, DetailedTeam, EditTeamDescriptionData } from '@domaindocs/types';
import { FormTextArea } from '../../../components/form/FormTextArea';
import { useEditable } from '../../../hooks/useEditable';
import { CloseIconButton } from '../../../components/buttons/CloseIconButton';
import { CheckIconButton } from '../../../components/buttons/CheckIconButton';
import { peopleApi } from '../../../state/api/people-api';
import { EditPersonAboutMeData } from '../../../../../shared/types/src/person/edit-person-about-me-data';
import { teamsApi } from '../../../state/api/teams-api';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

type TeamDescriptionProps = {
    domainId: string;
    team: DetailedTeam;
};

export const TeamDescription = (props: TeamDescriptionProps) => {
    const { domainId, team } = props;

    const editing = useEditable();

    return (
        <Stack spacing={2}>
            <Text fontSize={14}>About Me</Text>

            {editing.isEditing ? (
                <TeamDescriptionForm domainId={domainId} team={team} onClose={editing.onClose} />
            ) : (
                <Flex
                    _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                    py={2}
                    rounded={6}
                    onClick={editing.onEdit}
                >
                    <Text fontSize={12}>{team.team.description}</Text>
                </Flex>
            )}
        </Stack>
    );
};

type TeamDescriptionFormProps = {
    domainId: string;
    team: DetailedTeam;
    onClose: () => any;
};

export const TeamDescriptionForm = (props: TeamDescriptionFormProps) => {
    const { domainId, team, onClose } = props;

    const form = useForm<EditTeamDescriptionData>({
        values: {
            description: team.team.description,
        },
        resolver: classValidatorResolver(EditTeamDescriptionData),
    });

    const { mutateAsync: updateDescription } = useMutation<void, any, EditTeamDescriptionData>({
        mutationFn: (data) => teamsApi.updateDescription(domainId, team.team.teamId, data),
    });

    const close = () => {
        form.reset();
        onClose();
    };

    const submit = async (data: EditTeamDescriptionData) => {
        await updateDescription(data);
        close();
    };

    return (
        <form onSubmit={form.handleSubmit(submit)}>
            <Flex alignItems={'center'} direction={'column'} gap={1}>
                <FormTextArea name={'description'} control={form.control} />
                <ButtonGroup ml={'auto'}>
                    <CloseIconButton onClick={close} isDisabled={form.formState.isSubmitting} />
                    <CheckIconButton type={'submit'} isLoading={form.formState.isSubmitting} />
                </ButtonGroup>
            </Flex>
        </form>
    );
};
