import { IconButton, IconButtonProps } from '@chakra-ui/react';
import { IoMdClose } from 'react-icons/io';
import React from 'react';

export const CloseIconButton = React.forwardRef((props: Partial<IconButtonProps>, ref) => (
    <IconButton
        ref={ref}
        size={'sm'}
        variant={'ghost'}
        colorScheme={'gray'}
        icon={<IoMdClose />}
        aria-label="close"
        {...props}
    />
));
