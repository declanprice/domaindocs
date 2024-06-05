import { IconButton, IconButtonProps } from '@chakra-ui/react';
import { IoMdCheckmark } from 'react-icons/io';
import React from 'react';

export const CheckIconButton = React.forwardRef((props: Partial<IconButtonProps>, ref) => (
    <IconButton size={'sm'} {...props} ref={ref} colorScheme={'gray'} icon={<IoMdCheckmark />} aria-label="check" />
));
