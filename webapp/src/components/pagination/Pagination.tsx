import { Button, ButtonGroup, IconButton } from '@chakra-ui/react';
import { BiChevronDown, BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { MenuRoot, MenuTrigger, MenuItem, MenuContent } from '../ui/menu';

type PaginationProps = {
    totalItems: number;
    onPageChange: (page: number) => void;
};

export const Pagination = () => {
    return (
        <ButtonGroup alignItems={'center'}>
            <MenuRoot>
                <MenuTrigger>
                    <Button variant={'ghost'} colorPalette={'gray'}>
                        Show 5 Items <BiChevronDown />
                    </Button>
                </MenuTrigger>

                <MenuContent>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem VALUE={15}>15</MenuItem>
                </MenuContent>
            </MenuRoot>

            <IconButton aria-label={'left'} variant={'ghost'}>
                <BiChevronLeft />
            </IconButton>

            <Button variant={'ghost'} fontWeight={'normal'}>
                1
            </Button>

            <Button fontWeight={'normal'}>2</Button>

            <Button variant={'ghost'} fontWeight={'normal'}>
                3
            </Button>

            <IconButton aria-label={'left'} variant={'ghost'}>
                <BiChevronRight />
            </IconButton>
        </ButtonGroup>
    );
};
