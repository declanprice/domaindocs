import { Button, Flex } from '@chakra-ui/react';

export const DocumentActions = () => {
    return (
        <Flex>
            <Button size={'xs'} variant={'ghost'} fontWeight={'normal'}>
                Add Cover
            </Button>

            <Button size={'xs'} variant={'ghost'} fontWeight={'normal'}>
                Settings
            </Button>
        </Flex>
    );
};
