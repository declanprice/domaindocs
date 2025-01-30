import { IconButton, IconButtonProps } from '@chakra-ui/react';
import { IoMdCheckmark } from 'react-icons/io';
import React from 'react';

export const CheckIconButton = React.forwardRef((props: Partial<IconButtonProps>, ref: any) => (
    <IconButton {...props} variant={'outline'} ref={ref} colorScheme={'gray'} aria-label="check">
        {' '}
        <IoMdCheckmark />
    </IconButton>
));
