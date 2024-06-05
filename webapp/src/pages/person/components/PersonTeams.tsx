import { Flex, Link, List, ListItem, Text } from '@chakra-ui/react';
import { PersonTeam } from '@domaindocs/types';
import { GoPeople } from 'react-icons/go';

type PersonTeamsProps = {
    domainId: string;
    userId: string;
    teams: PersonTeam[];
};

export const PersonTeams = (props: PersonTeamsProps) => {
    const { domainId, userId, teams } = props;

    return (
        <Flex backgroundColor={'lightgray'} p={2} rounded={4} gap={3} direction={'column'}>
            <Flex alignItems={'center'} gap={4}>
                <Flex alignItems={'center'} backgroundColor={'purple.400'} rounded={6} p={2}>
                    <GoPeople color={'white'} />
                </Flex>

                <Text>Teams</Text>
            </Flex>

            <List>
                {teams.map((team) => (
                    <ListItem
                        key={team.teamId}
                        p={1}
                        _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                        rounded={6}
                        px={1}
                        gap={2}
                        alignItems={'center'}
                        height={'30px'}
                        display={'flex'}
                    >
                        <Link href={`/${domainId}/teams/${team.teamId}/overview`} fontSize={12}>
                            {team.teamName}
                        </Link>
                    </ListItem>
                ))}
            </List>
        </Flex>
    );
};
