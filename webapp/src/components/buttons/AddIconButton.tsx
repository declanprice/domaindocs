import { IconButton, IconButtonProps } from '@chakra-ui/react'
import { LuPlus } from 'react-icons/lu'
import React from 'react'

export const AddIconButton = React.forwardRef(
    (props: Partial<IconButtonProps>, ref) => (
        <IconButton
            {...props}
            ref={ref}
            size={'sm'}
            variant={'ghost'}
            colorScheme={'gray'}
            icon={<LuPlus />}
            aria-label="add"
        />
    )
)
