import { Avatar, Badge, Flex, List, ListItem, Text } from '@chakra-ui/react';
import { PersonSkill, PersonTeam } from '@domaindocs/lib';
import { AddIconButton } from '../../components/buttons/AddIconButton';

type PersonSkillsListProps = {
    skills: PersonSkill[];
};

export const PersonSkillsList = (props: PersonSkillsListProps) => {
    const { skills } = props;

    return (
        <Flex direction={'column'} py={2} gap={2}>
            <Flex>
                <Text fontSize={18}>Skills</Text>

                <AddIconButton marginLeft={'auto'} />
            </Flex>

            <List spacing={2}>
                {skills.map((skill: PersonSkill) => (
                    <ListItem>
                        <Badge fontSize={14}>{skill.skillName}</Badge>
                    </ListItem>
                ))}
            </List>
        </Flex>
    );
};
