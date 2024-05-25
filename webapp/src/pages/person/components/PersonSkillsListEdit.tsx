import { Flex, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { DefaultError, useMutation, useQuery } from '@tanstack/react-query';
import { CreateSkillData, DetailedPerson, PersonSkill, Skill } from '@domaindocs/types';

import { CloseIconButton } from '../../../components/buttons/CloseIconButton';
import { CheckIconButton } from '../../../components/buttons/CheckIconButton';
import { FormCreatableSelectable } from '../../../components/form/FormCreatableSelectable';
import { LoadingContainer } from '../../../components/loading/LoadingContainer';
import { skillsApi } from '../../../state/api/skills-api';
import { queryClient } from '../../../state/query-client';
import { peopleApi } from '../../../state/api/people-api';
import { UpdatePersonSkillsData } from '../../../../../shared/types/src/person/update-person-skills-data';

type PersonSkillsListEditProps = {
    domainId: string;
    userId: string;
    skills: PersonSkill[];
    onSubmit: () => void;
    onCancel: () => void;
};

export const PersonSkillsListEdit = (props: PersonSkillsListEditProps) => {
    const { domainId, userId, skills, onSubmit, onCancel } = props;

    const { data: allSkills, isLoading } = useQuery<Skill[]>({
        queryKey: ['searchSkills', { domainId }],
        queryFn: () => skillsApi.search(domainId, {}),
    });

    const { mutateAsync: createSkill } = useMutation<Skill, DefaultError, CreateSkillData>({
        mutationKey: ['createSkill', { domainId }],
        mutationFn: async (data) => {
            return skillsApi.create(domainId, data);
        },
    });

    const { mutateAsync: updatePersonSkills } = useMutation<void, DefaultError, UpdatePersonSkillsData>({
        mutationKey: ['updatePersonSkills', { domainId, userId }],
        mutationFn: async (data) => {
            return peopleApi.updateSkills(domainId, userId, data);
        },
    });

    const { control, setValue, getValues } = useForm({
        values: {
            skills: props.skills.map((s) => ({
                label: s.skillName,
                value: s.skillId,
            })),
        },
    });

    if (!allSkills || isLoading) return <LoadingContainer />;

    return (
        <Flex direction={'column'} gap={1} height={'300px'}>
            <Flex>
                <Text fontSize={16}>Skills</Text>

                <CloseIconButton marginLeft={'auto'} onClick={props.onCancel} />
                <CheckIconButton
                    onClick={async () => {
                        const skillIds = getValues('skills').map((s) => s.value);

                        await updatePersonSkills({
                            skillIds,
                        });

                        onSubmit();
                    }}
                />
            </Flex>

            <FormCreatableSelectable
                name={'skills'}
                control={control}
                options={allSkills.map((s) => ({
                    label: s.name,
                    value: s.skillId,
                }))}
                onCreateOption={async (name) => {
                    const skill = await createSkill({
                        name,
                    });

                    setValue('skills', [...getValues('skills'), { label: skill.name, value: skill.skillId }]);

                    queryClient.setQueryData(['searchSkills', { domainId }], [...allSkills, skill]);
                }}
            />
        </Flex>
    );
};
