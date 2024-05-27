import { Button, ButtonGroup, Divider, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { BiChevronDown, BiChevronLeft, BiChevronRight } from 'react-icons/bi';

type PaginationProps = {
    totalItems: number;
    onPageChange: (page: number) => void;
};

export const Pagination = () => {
    return (
        <ButtonGroup alignItems={'center'}>
            <Menu>
                <MenuButton
                    as={Button}
                    variant={'ghost'}
                    fontSize={12}
                    size={'xs'}
                    fontWeight={'normal'}
                    rightIcon={<BiChevronDown />}
                >
                    Show 5 Items
                </MenuButton>

                <MenuList>
                    <MenuItem fontSize={12}>5</MenuItem>
                    <MenuItem fontSize={12}>10</MenuItem>
                    <MenuItem fontSize={12}>20</MenuItem>
                </MenuList>
            </Menu>

            <Divider orientation={'vertical'} height={'20px'} />

            <IconButton aria-label={'left'} variant={'ghost'} size={'xs'} icon={<BiChevronLeft />} />

            <Button fontSize={12} variant={'ghost'} size={'xs'} fontWeight={'normal'}>
                1
            </Button>

            <Button fontSize={12} size={'xs'} fontWeight={'normal'}>
                2
            </Button>

            <Button fontSize={12} variant={'ghost'} size={'xs'} fontWeight={'normal'}>
                3
            </Button>
            <IconButton aria-label={'left'} variant={'ghost'} size={'xs'} icon={<BiChevronRight />} />
        </ButtonGroup>
    );
};
