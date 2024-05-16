import { Avatar, Flex, List, ListItem, Stack, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react';
import { PersonContact } from '@domaindocs/lib';
import { AddIconButton } from '../../components/buttons/AddIconButton';
import React from 'react';

type PersonContactDetailsProps = {
    contact: PersonContact;
};

export const PersonContactDetails = (props: PersonContactDetailsProps) => {
    const { contact } = props;

    return (
        <Flex direction={'column'} py={2} gap={2}>
            <Flex>
                <Text fontSize={18}>Contact Details</Text>

                <AddIconButton marginLeft={'auto'} />
            </Flex>

            <Stack spacing={4}>
                <Flex>
                    <Stack flex={1}>
                        <Text fontSize={14}>Contact Email</Text>
                        <Text fontSize={12}> declanprice1@gmail.com</Text>
                    </Stack>

                    <Stack flex={1}>
                        <Text fontSize={14}>Contact Mobile</Text>
                        <Text fontSize={12}> 07123123123</Text>
                    </Stack>
                </Flex>

                <Flex>
                    <Stack flex={1}>
                        <Text fontSize={14}>Personal Email</Text>
                        <Text fontSize={12}> declanprice1@gmail.com</Text>
                    </Stack>

                    <Stack flex={1}>
                        <Text fontSize={14}>Personal Mobile</Text>
                        <Text fontSize={12}> 07123123123</Text>
                    </Stack>
                </Flex>
            </Stack>
        </Flex>
    );
};
