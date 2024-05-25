import { Flex, Text } from '@chakra-ui/react';
import { DetailedPerson, UpdateTeamMembersData, TeamMember } from '@domaindocs/types';
import { CloseIconButton } from '../../../components/buttons/CloseIconButton';
import { CheckIconButton } from '../../../components/buttons/CheckIconButton';
import { DefaultError, useMutation, useQuery } from '@tanstack/react-query';
import { peopleApi } from '../../../state/api/people-api';
import { useForm } from 'react-hook-form';
import { LoadingContainer } from '../../../components/loading/LoadingContainer';
import { FormSelectable } from '../../../components/form/FormSelectable';
import { teamsApi } from '../../../state/api/teams-api';
import { PersonAvatar } from '../../../components/person/PersonAvatar';
import { chakraComponents } from 'chakra-react-select';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

type TeamMembersListEditProps = {
    domainId: string;
    teamId: string;
    members: TeamMember[];
    onSubmit: () => void;
    onCancel: () => void;
};

export const TeamMembersListEdit = (props: TeamMembersListEditProps) => {
    const { domainId, teamId, members, onSubmit, onCancel } = props;

    const { data: allPeople, isLoading } = useQuery<DetailedPerson[]>({
        queryKey: ['searchPeople', { domainId }],
        queryFn: () => peopleApi.search(domainId, {}),
    });

    const { mutateAsync: updateMembers } = useMutation<void, DefaultError, UpdateTeamMembersData>({
        mutationKey: ['updateTeamMembers', { domainId, teamId }],
        mutationFn: async (data) => {
            return teamsApi.updateMembers(domainId, teamId, data);
        },
    });

    const { control, getValues } = useForm({
        values: {
            members: members.map((m) => ({
                label: `${m.firstName} ${m.lastName}`,
                value: m.userId,
            })),
        },
        resolver: classValidatorResolver(UpdateTeamMembersData),
    });

    if (!allPeople || isLoading) return <LoadingContainer />;

    return (
        <Flex direction={'column'} gap={2}>
            <Flex>
                <Text fontSize={16}>Members</Text>

                <CloseIconButton marginLeft={'auto'} onClick={onCancel} />

                <CheckIconButton
                    onClick={async () => {
                        await updateMembers({
                            userIds: getValues('members').map((member) => member.value),
                        });

                        onSubmit();
                    }}
                />
            </Flex>

            <FormSelectable
                name={'members'}
                control={control}
                options={allPeople.map((s) => ({
                    label: `${s.person.firstName} ${s.person.lastName}`,
                    value: s.person.userId,
                    person: s.person,
                }))}
                components={{
                    Option: (props) => {
                        const { person } = props.data;

                        return (
                            <chakraComponents.Option key={person.userId} {...props}>
                                <PersonAvatar
                                    firstName={person.firstName}
                                    lastName={person.lastName}
                                    iconUri={person.iconUri}
                                    extraSmall
                                />
                            </chakraComponents.Option>
                        );
                    },
                }}
            />
        </Flex>
    );
};
