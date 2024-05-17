import { Flex, Heading } from '@chakra-ui/react';

export const FileTitle = (props: { title: string }) => {
    return (
        <Flex maxWidth={'900px'} width={'100%'}>
            <Heading variant={'h2'} fontWeight={'bold'}>
                {props.title}
            </Heading>
        </Flex>
    );
};
