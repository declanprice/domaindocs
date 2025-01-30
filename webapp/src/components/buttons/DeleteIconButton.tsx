import { IconButton, IconButtonProps } from '@chakra-ui/react';
import React from 'react';
import { IoTrashBin } from 'react-icons/io5';

export const DeleteIconButton = React.forwardRef((props: Partial<IconButtonProps>, ref: any) => (
    <IconButton ref={ref} variant={'outline'} aria-label="close" {...props}>
        <IoTrashBin />
    </IconButton>
));
