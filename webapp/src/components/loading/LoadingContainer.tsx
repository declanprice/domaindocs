import { Flex, Spinner } from '@chakra-ui/react';

export const LoadingContainer = (props: { height?: string; width?: string }) => {
    return (
        <Flex width={'100%'} height={'100%'} align={'center'} justifyContent={'center'}>
            <Spinner height={props.height} width={props.width} />
        </Flex>
    );
};
