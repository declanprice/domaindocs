import { Flex, Text } from '@chakra-ui/react';
import { Team, UpdateTeamSummaryData } from '@domaindocs/types';
import { DefaultError, useMutation } from '@tanstack/react-query';
import { teamsApi } from '../../../state/api/teams-api';
import { CloseIconButton } from '../../../components/buttons/CloseIconButton';
import { CheckIconButton } from '../../../components/buttons/CheckIconButton';
import { FormTextArea } from '../../../components/form/FormTextArea';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

type TeamSummaryEditProps = {
    domainId: string;
    team: Team;
    onSubmit: () => void;
    onCancel: () => void;
};

export const TeamSummaryEdit = (props: TeamSummaryEditProps) => {
    const { domainId, team, onCancel, onSubmit } = props;

    const { mutateAsync } = useMutation<void, DefaultError, UpdateTeamSummaryData>({
        mutationKey: ['updateTeamSummary', { domainId, teamId: team.teamId }],
        mutationFn: (data) => teamsApi.updateSummary(domainId, team.teamId, data),
    });

    const { control, getValues } = useForm({
        values: {
            description: team.description,
        },
        resolver: classValidatorResolver(UpdateTeamSummaryData),
    });

    return (
        <Flex direction={'column'} gap={1}>
            <Flex>
                <Text fontSize={16}>Summary</Text>

                <CloseIconButton marginLeft={'auto'} onClick={onCancel} />

                <CheckIconButton
                    onClick={async () => {
                        await mutateAsync({
                            description: getValues('description'),
                        });

                        onSubmit();
                    }}
                />
            </Flex>

            <FormTextArea name={'description'} control={control} />
        </Flex>
    );
};
