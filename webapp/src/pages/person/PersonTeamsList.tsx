import { Avatar, Flex, List, ListItem, Text } from '@chakra-ui/react';
import { PersonTeam } from '@domaindocs/lib';
import { AddIconButton } from '../../components/buttons/AddIconButton';

type PersonTeamsListProps = {
    teams: PersonTeam[];
};

export const PersonTeamsList = (props: PersonTeamsListProps) => {
    const { teams } = props;

    return (
        <Flex direction={'column'} py={2} gap={2}>
            <Flex>
                <Text fontSize={18}>Teams</Text>

                <AddIconButton marginLeft={'auto'} />
            </Flex>

            <List spacing={1}>
                {teams.map((team: PersonTeam) => (
                    <ListItem>
                        <Flex alignItems={'center'}>
                            <Avatar size={'sm'} src={team.teamIconUri} name={team.teamName} />

                            <Flex ml={4} direction={'column'} justifyContent={'center'}>
                                <Text fontSize={14}>{team.teamName}</Text>
                            </Flex>
                        </Flex>
                    </ListItem>
                ))}
            </List>
        </Flex>
    );
};
