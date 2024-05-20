import { Flex, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { PersonSkill, Skill } from '@domaindocs/lib';

import { CloseIconButton } from '../../../components/buttons/CloseIconButton';
import { CheckIconButton } from '../../../components/buttons/CheckIconButton';
import { FormSelectable } from '../../../components/form/FormSelectable';
import { LoadingContainer } from '../../../components/loading/LoadingContainer';
import { skillsApi } from '../../../state/api/skills-api';

type PersonSkillsListEditProps = {
    domainId: string;
    skills: PersonSkill[];
};

export const PersonSkillsListEdit = (props: PersonSkillsListEditProps) => {
    const { domainId, skills } = props;

    const { data: availableSkills, isLoading } = useQuery<Skill[]>({
        queryKey: ['searchSkills', { domainId }],
        queryFn: () => skillsApi.search(domainId, {}),
    });

    const { control } = useForm();

    if (!availableSkills || isLoading) return <LoadingContainer />;

    return (
        <Flex direction={'column'} gap={1} height={'300px'}>
            <Flex>
                <Text fontSize={16}>Skills</Text>

                <CloseIconButton marginLeft={'auto'} />
                <CheckIconButton />
            </Flex>

            <FormSelectable
                name={'Skills'}
                control={control}
                options={availableSkills.map((s) => ({
                    label: s.name,
                    value: s.skillId,
                }))}
            />
        </Flex>
    );
};
