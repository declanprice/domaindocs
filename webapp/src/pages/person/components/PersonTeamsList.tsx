import { Avatar, Flex, List, ListItem, Text } from '@chakra-ui/react';
import { PersonTeam } from '@domaindocs/types';
import { AddIconButton } from '../../../components/buttons/AddIconButton';

type PersonTeamsListProps = {
    teams: PersonTeam[];
};

export const PersonTeamsList = (props: PersonTeamsListProps) => {
    const { teams } = props;

    return (
        <Flex direction={'column'} gap={4}>
            <Flex>
                <Text fontSize={16}>Teams</Text>
            </Flex>

            <List spacing={3}>
                {teams.map((team: PersonTeam) => (
                    <ListItem key={team.teamId}>
                        <Flex alignItems={'center'}>
                            <Avatar rounded={4} size={'sm'} src={team.teamIconUri} name={team.teamName} />

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
