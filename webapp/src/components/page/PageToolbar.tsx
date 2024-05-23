import { Button, Flex, Tabs, TabList, Tab } from '@chakra-ui/react';

type PageTabOption = {
    isActive: boolean;
    label: string;
    onClick: () => void;
};

type PageActionOption = {
    label: string;
    onClick: () => void;
};

type PageToolbarProps = {
    title?: any;
    tabs?: PageTabOption[];
    actions?: PageActionOption[];
};

export const PageToolbar = (props: PageToolbarProps) => {
    const { title, tabs, actions } = props;

    return (
        <Flex
            height={'42px'}
            minHeight={'42px'}
            width={'100%'}
            borderBottom={'1px solid'}
            borderColor={'border'}
            alignItems={'center'}
            gap={10}
            px={4}
        >
            {title && <> {title} </>}

            {tabs && (
                <Tabs
                    index={tabs.findIndex((t) => t.isActive)}
                    colorScheme={'gray'}
                    size={'md'}
                    height={'100%'}
                    display={'flex'}
                    alignItems={'flex-end'}
                    zIndex={1}
                >
                    <TabList borderBottom={'0'} pb={'2px'}>
                        {tabs.map((t) => (
                            <Tab key={t.label} onClick={t.onClick} fontSize={12}>
                                {t.label}
                            </Tab>
                        ))}
                    </TabList>
                </Tabs>
            )}

            {actions && (
                <Flex ml={'auto'}>
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
    );
};
