import { Avatar, Badge, Flex, Text } from '@chakra-ui/react';
import { Person } from '@domaindocs/lib';

type PersonSummaryProps = {
    person: Person;
};

export const PersonSummary = (props: PersonSummaryProps) => {
    const { person } = props;

    return (
        <Flex alignItems={'center'} mb={4}>
            <Avatar src={person.iconUri} name={person.firstName} />

            <Flex ml={4} direction={'column'} justifyContent={'center'}>
                <Text fontSize={14}>
                    {person.firstName} {person.lastName}
                </Text>

                {person.primaryRoleName ? (
                    <Text fontSize={12}>{person.primaryRoleName}</Text>
                ) : (
                    <Badge colorScheme={'yellow'} size={'xs'}>
                        No Role Assigned
                    </Badge>
                )}
            </Flex>
        </Flex>
    );
};
