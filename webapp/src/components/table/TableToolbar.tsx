import { Box, Button, ButtonGroup, Flex, Tabs, Text } from '@chakra-ui/react';
import { IoSearchOutline } from 'react-icons/io5';
import { CiFilter } from 'react-icons/ci';

type TableToolbarProps = {
    title?: string;
    tabs?: { label: string; onClick: () => any; isActive: boolean }[];
    actions?: any;
    onSearch: (value: string) => void;
    onFilterClick: () => void;
};

export const TableToolbar = (props: TableToolbarProps) => {
    const { title, tabs, actions } = props;

    return (
        <Flex width={'100%'} height={'40px'} px={2} gap={4} alignItems="center">
            <Text fontSize={12}>{title}</Text>

            {tabs && tabs?.length > 0 && (
                <Tabs.Root
                    index={0}
                    colorScheme={'gray'}
                    size={'md'}
                    height={'100%'}
                    display={'flex'}
                    alignItems={'flex-end'}
                    zIndex={1}
                >
                    <Tabs.List borderBottom={'0'}>
                        {tabs?.map((tab) => (
                            <Tabs.Trigger onClick={tab.onClick} fontSize={12}>
                                {tab.label}
                            </Tabs.Trigger>
                        ))}
                    </Tabs.List>
                </Tabs.Root>
            )}

            <Flex p={1} ml={'auto'} gap={2}>
                {actions && (
                    <Flex flex={1} gap={2} justifyContent={'flex-end'}>
                        {actions}

                        <Box height={'inherit'} divideY={'1px'} />
                    </Flex>
                )}

                <ButtonGroup>
                    <Button size={'sm'} variant={'ghost'} colorScheme={'gray'}>
                        <IoSearchOutline fontSize={18} color={'gray.900'} />
                    </Button>

                    <Button size={'sm'} variant={'ghost'} colorScheme={'gray'}>
                        <CiFilter fontSize={18} color={'gray.900'} />
                    </Button>
                </ButtonGroup>
            </Flex>
        </Flex>
    );
};
