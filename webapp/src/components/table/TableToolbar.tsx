import { Button, ButtonGroup, Flex, Text } from '@chakra-ui/react';
import { IoSearchOutline } from 'react-icons/io5';
import { CiFilter } from 'react-icons/ci';
type TableToolbarProps = {
    title?: string;
    filterTabs?: { label: string; value: string }[];
    onSearch: (value: string) => void;
    onFilterClick: () => void;
};

export const TableToolbar = (props: TableToolbarProps) => {
    const { title } = props;

    return (
        <Flex width={'100%'} px={2} alignItems="center">
            <Text fontSize={12}>{title}</Text>

            <ButtonGroup ml={'auto'}>
                <Button size={'sm'} variant={'ghost'} colorScheme={'gray'}>
                    <IoSearchOutline fontSize={18} color={'gray.900'} />
                    <Text ml={1} fontWeight={'normal'} fontSize={12}>
                        Search
                    </Text>
                </Button>
                <Button size={'sm'} variant={'ghost'} colorScheme={'gray'}>
                    <CiFilter fontSize={18} color={'gray.900'} />
                    <Text ml={1} fontWeight={'normal'} fontSize={12}>
                        Filter
                    </Text>
                </Button>
            </ButtonGroup>
        </Flex>
    );
};
