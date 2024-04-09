import { Button, Flex, Text } from '@chakra-ui/react'

type PageToolbarProps = {
    icon?: any
    title?: any
    tabs?: []
    actions?: []
}

export const PageToolbar = (props: PageToolbarProps) => {
    const { icon, title, tabs, actions } = props

    return (
        <Flex
            height={'45px'}
            minHeight={'45px'}
            width={'100%'}
            borderBottom={'1px solid'}
            borderColor={'border'}
            alignItems={'center'}
            gap={2}
            px={4}
        >
            {icon && <>{icon}</>}

            {title && <Text fontSize={14}>{title}</Text>}

            {tabs && (
                <Flex ml={10} height={'100%'} alignItems={'flex-end'} flex={1}>
                    <Button
                        size={'sm'}
                        variant={'ghost'}
                        borderBottom={'1px solid'}
                        borderRadius={0}
                        colorScheme="gray"
                        fontWeight={'regular'}
                    >
                        Overview
                    </Button>

                    <Button
                        size={'sm'}
                        variant={'ghost'}
                        borderRadius={0}
                        colorScheme="gray"
                        fontWeight={'regular'}
                    >
                        People
                    </Button>

                    <Button
                        size={'sm'}
                        variant={'ghost'}
                        borderRadius={0}
                        colorScheme="gray"
                        fontWeight={'regular'}
                    >
                        Teams
                    </Button>

                    <Button
                        size={'sm'}
                        variant={'ghost'}
                        borderRadius={0}
                        colorScheme="gray"
                        fontWeight={'regular'}
                    >
                        Projects
                    </Button>
                </Flex>
            )}

            {actions && (
                <Flex>
                    <Button
                        variant={'ghost'}
                        size={'sm'}
                        fontWeight={'regular'}
                        fontSize={12}
                        colorScheme="gray"
                    >
                        New Subdomain
                    </Button>
                </Flex>
            )}
        </Flex>
    )
}
