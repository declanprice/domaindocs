import { Flex, Stack, Text } from '@chakra-ui/react';
import { IoInformation } from 'react-icons/io5';
import { format } from 'date-fns';
import { DetailedTeam } from '@domaindocs/types';

type TeamDetailsProps = {
    team: DetailedTeam;
};

export const TeamDetails = (props: TeamDetailsProps) => {
    const { team } = props;

    return (
        <Flex backgroundColor={'lightgray'} p={2} rounded={4} gap={3} direction={'column'}>
            <Flex alignItems={'center'} gap={4}>
                <Flex alignItems={'center'} backgroundColor={'pink.400'} rounded={6} p={2}>
                    <IoInformation color={'white'} />
                </Flex>

                <Text>Details</Text>
            </Flex>

            <Stack spacing={0}>
                <Text fontSize={12} fontWeight={300}>
                    Date formed
                </Text>

                <Text fontSize={12} fontWeight={400}>
                    {format(team.team.dateFormed, 'Mo MMM yyyy')}
                </Text>
            </Stack>
        </Flex>
    );
};
