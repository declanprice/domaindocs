import { IconButton, IconButtonProps } from '@chakra-ui/react';
import { LuPlus } from 'react-icons/lu';
import React from 'react';

export const AddIconButton = React.forwardRef((props: Partial<IconButtonProps>, ref: any) => (
    <IconButton ref={ref} variant={'ghost'} aria-label="add" {...props}>
        <LuPlus />
    </IconButton>
));
