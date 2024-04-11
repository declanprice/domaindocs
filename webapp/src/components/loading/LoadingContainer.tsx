import { Flex, Spinner } from '@chakra-ui/react'

export const LoadingContainer = () => {
    return (
        <Flex
            width={'100%'}
            height={'100%'}
            align={'center'}
            justifyContent={'center'}
        >
            <Spinner />
        </Flex>
    )
}
