import { Flex, Heading } from '@chakra-ui/react';

export const DocumentTitle = () => {
    return (
        <Flex maxWidth={'900px'} width={'100%'}>
            <Heading variant={'h2'} fontWeight={'bold'}>
                Document Title
            </Heading>
        </Flex>
    );
};
