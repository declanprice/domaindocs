import { Avatar, Button, Flex, Text } from '@chakra-ui/react';

import { MdOutlineUpdate, MdOutlineWbSunny } from 'react-icons/md';

export const DocumentDetails = () => {
    return (
        <Flex maxWidth={'900px'} width={'100%'} alignItems={'center'} gap={4}>
            <Flex alignItems={'center'} gap={1}>
                <MdOutlineWbSunny size={18} />
                <Text fontSize={12}>Created 13th May 2023, 14:00</Text>
            </Flex>

            <Flex alignItems={'center'} gap={1}>
                <MdOutlineUpdate size={18} />
                <Text fontSize={12}>Updated 13th May 2023, 14:00</Text>
            </Flex>

            <Button variant={'ghost'}>
                <Avatar size={'xs'} name={`Declan Price`} />

                <Flex ml={2} gap={1} alignItems={'center'}>
                    <Text fontSize={12} fontWeight={'bold'}>
                        Created By
                    </Text>
                    <Text fontSize={12} fontWeight={'normal'}>
                        Declan
                    </Text>
                </Flex>
            </Button>
        </Flex>
    );
};
