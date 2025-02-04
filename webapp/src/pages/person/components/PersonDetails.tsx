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
        <Flex backgroundColor={'lightgray'} p={4} rounded={4} gap={3} direction={'column'}>
            <Flex alignItems={'center'} gap={4}>
                <Flex alignItems={'center'} backgroundColor={'pink.400'} rounded={6} p={2}>
                    <IoInformation color={'white'} />
                </Flex>

                <Text fontSize={18}>Details</Text>
            </Flex>

            <Stack>
                <Text fontSize={14} fontWeight={300}>
                    Date joined
                </Text>

                <Text fontSize={14} fontWeight={400}>
                    {format(person.person.dateJoined, 'Mo MMM yyyy')}
                </Text>
            </Stack>
        </Flex>
    );
};
