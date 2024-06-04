import { Flex, Stack, Text } from '@chakra-ui/react';
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

            <Stack spacing={2}>
                <Text fontSize={12} fontWeight={300}>
                    Team Orion
                </Text>

                <Text fontSize={12} fontWeight={300}>
                    Team Keplar
                </Text>
            </Stack>
        </Flex>
    );
};
