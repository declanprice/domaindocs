import { Avatar, Badge, Flex, List, ListItem, Text } from '@chakra-ui/react';
import { PersonSkill, PersonTeam } from '@domaindocs/lib';
import { AddIconButton } from '../../../components/buttons/AddIconButton';

type PersonSkillsListProps = {
    skills: PersonSkill[];
};

export const PersonSkillsList = (props: PersonSkillsListProps) => {
    const { skills } = props;

    return (
        <Flex direction={'column'} gap={1}>
            <Flex>
                <Text fontSize={16}>Skills</Text>

                <AddIconButton marginLeft={'auto'} />
            </Flex>

            <List spacing={2}>
                {skills.map((skill: PersonSkill) => (
                    <ListItem>
                        <Badge fontSize={12}>{skill.skillName}</Badge>
                    </ListItem>
                ))}
            </List>
        </Flex>
    );
};
