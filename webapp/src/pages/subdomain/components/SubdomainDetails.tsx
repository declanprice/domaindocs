import { Flex, Stack, Text } from '@chakra-ui/react';
import { IoInformation } from 'react-icons/io5';
import { format } from 'date-fns';
import { Subdomain } from '@domaindocs/types';

type SubdomainDetailsProps = {
    subdomain: Subdomain;
};

export const SubdomainDetails = (props: SubdomainDetailsProps) => {
    const { subdomain } = props;

    return (
        <Flex backgroundColor={'lightgray'} p={4} rounded={4} gap={3} direction={'column'}>
            <Flex alignItems={'center'} gap={4}>
                <Flex alignItems={'center'} fontSize={16} backgroundColor={'pink.400'} rounded={6} p={2}>
                    <IoInformation color={'white'} />
                </Flex>

                <Text fontSize={18}>Details</Text>
            </Flex>

            <Stack gap={1}>
                <Text fontSize={14} fontWeight={300}>
                    Date created
                </Text>

                <Text fontSize={14} fontWeight={400}>
                    {format(subdomain.dateCreated, 'Mo MMM yyyy')}
                </Text>
            </Stack>
        </Flex>
    );
};
