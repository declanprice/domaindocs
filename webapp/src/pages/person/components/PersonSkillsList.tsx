import { Badge, Flex, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { PersonSkill } from '@domaindocs/types';
import { EditIconButton } from '../../../components/buttons/EditIconButton';

type PersonSkillsListProps = {
    skills: PersonSkill[];
    onEdit: () => void;
};

export const PersonSkillsList = (props: PersonSkillsListProps) => {
    const { skills } = props;

    return (
        <>
            <Flex direction={'column'} gap={1}>
                <Flex>
                    <Text fontSize={16}>Skills</Text>

                    <EditIconButton marginLeft={'auto'} onClick={props.onEdit} />
                </Flex>

                <Wrap spacing={2}>
                    {skills.map((skill: PersonSkill) => (
                        <WrapItem key={skill.skillId}>
                            <Badge fontSize={12}>{skill.skillName}</Badge>
                        </WrapItem>
                    ))}
                </Wrap>
            </Flex>
        </>
    );
};
