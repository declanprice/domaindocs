import { IconButton, IconButtonProps } from '@chakra-ui/react'
import { IoMdCheckmark } from 'react-icons/io'
import React from 'react'

export const CheckIconButton = React.forwardRef(
    (props: Partial<IconButtonProps>, ref) => (
        <IconButton
            {...props}
            ref={ref}
            size={'sm'}
            variant={'ghost'}
            colorScheme={'gray'}
            icon={<IoMdCheckmark />}
            aria-label="check"
        />
    )
)
