import { Button, Flex, Tabs, TabList, Tab, Text } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

type PageTabOption = {
    isActive: boolean;
    label: string;
    icon?: any;
    onClick: () => void;
};

type PageToolbarProps = {
    title?: any;
    tabs?: PageTabOption[];
} & PropsWithChildren;

export const PageToolbar = (props: PageToolbarProps) => {
    const { title, tabs, children } = props;

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
                                <Flex alignItems={'center'} gap={2}>
                                    {t.icon && <>{t.icon}</>}
                                    <Text>{t.label}</Text>
                                </Flex>
                            </Tab>
                        ))}
                    </TabList>
                </Tabs>
            )}

            {props.children}
        </Flex>
    );
};
