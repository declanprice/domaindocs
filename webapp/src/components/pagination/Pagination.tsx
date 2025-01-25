import { Box, Button, ButtonGroup, IconButton, Menu, MenuContent, MenuItem } from '@chakra-ui/react';
import { BiChevronDown, BiChevronLeft, BiChevronRight } from 'react-icons/bi';

type PaginationProps = {
    totalItems: number;
    onPageChange: (page: number) => void;
};

export const Pagination = () => {
    return (
        <ButtonGroup alignItems={'center'}>
            <Menu.Root>
                <Menu.Trigger
                    as={Button}
                    variant={'ghost'}
                    fontSize={12}
                    size={'xs'}
                    fontWeight={'normal'}
                    rightIcon={<BiChevronDown />}
                >
                    Show 5 Items
                </Menu.Trigger>

                <MenuContent>
                    <MenuItem fontSize={12}>5</MenuItem>
                    <MenuItem fontSize={12}>10</MenuItem>
                    <MenuItem fontSize={12}>20</MenuItem>
                </MenuContent>
            </Menu.Root>

            <Box divideY={'20px'} />

            <IconButton aria-label={'left'} variant={'ghost'} size={'xs'}>
                <BiChevronLeft />
            </IconButton>

            <Button fontSize={12} variant={'ghost'} size={'xs'} fontWeight={'normal'}>
                1
            </Button>

            <Button fontSize={12} size={'xs'} fontWeight={'normal'}>
                2
            </Button>

            <Button fontSize={12} variant={'ghost'} size={'xs'} fontWeight={'normal'}>
                3
            </Button>

            <IconButton aria-label={'left'} variant={'ghost'} size={'xs'}>
                <BiChevronRight />
            </IconButton>
        </ButtonGroup>
    );
};
