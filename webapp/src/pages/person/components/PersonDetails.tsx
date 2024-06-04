import { DetailedPerson } from '@domaindocs/types';
import { Flex, Stack, Text } from '@chakra-ui/react';
import { IoInformation } from 'react-icons/io5';
import { format } from 'date-fns';

type PersonDetailsProps = {
    person: DetailedPerson;
};

export const PersonDetails = (props: PersonDetailsProps) => {
    const { person } = props;

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
                    Date joined
                </Text>

                <Text fontSize={12} fontWeight={400}>
                    {format(person.person.dateJoined, 'Mo MMM yyyy')}
                </Text>
            </Stack>
        </Flex>
    );
};
