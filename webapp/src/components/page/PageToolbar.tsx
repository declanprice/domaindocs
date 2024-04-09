import { Button, Flex } from '@chakra-ui/react'

type PageTabOption = {
    isActive: boolean
    label: string
    onClick: () => void
}

type PageActionOption = {
    label: string
    onClick: () => void
}

type PageToolbarProps = {
    title?: any
    tabs?: PageTabOption[]
    actions?: PageActionOption[]
}

export const PageToolbar = (props: PageToolbarProps) => {
    const { title, tabs, actions } = props

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
            {title && <> {title} </>}

            {tabs && (
                <Flex ml={10} height={'100%'} alignItems={'flex-end'} flex={1}>
                    {tabs.map((tab) => (
                        <Button
                            key={tab.label}
                            size={'sm'}
                            fontSize={12}
                            variant={'ghost'}
                            borderBottom={
                                tab.isActive ? '1px solid' : undefined
                            }
                            borderRadius={0}
                            colorScheme="gray"
                            fontWeight={'regular'}
                            onClick={tab.onClick}
                        >
                            {tab.label}
                        </Button>
                    ))}
                </Flex>
            )}

            {actions && (
                <Flex>
                    {actions.map((action) => (
                        <Button
                            key={action.label}
                            variant={'ghost'}
                            size={'sm'}
                            fontWeight={'regular'}
                            fontSize={12}
                            colorScheme="gray"
                            onClick={action.onClick}
                        >
                            {action.label}
                        </Button>
                    ))}
                </Flex>
            )}
        </Flex>
    )
}
