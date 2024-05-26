import { Flex, Text } from '@chakra-ui/react';
import { EditIconButton } from '../../../components/buttons/EditIconButton';
import React from 'react';

export const FormDescription = () => {
    return (
        <Flex direction={'column'} gap={1}>
            <Flex>
                <Text fontSize={16}>Description</Text>

                <EditIconButton marginLeft={'auto'} onClick={() => {}} />
            </Flex>

            <Text fontSize={12}>I am a form description</Text>
        </Flex>
    );
};
