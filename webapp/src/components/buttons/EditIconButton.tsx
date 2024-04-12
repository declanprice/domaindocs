import { IconButton, IconButtonProps } from '@chakra-ui/react'
import { CiEdit } from 'react-icons/ci'
import React from 'react'

export const EditIconButton = React.forwardRef(
    (props: Partial<IconButtonProps>, ref) => (
        <IconButton
            {...props}
            ref={ref}
            size={'sm'}
            variant={'ghost'}
            colorScheme={'gray'}
            icon={<CiEdit />}
            aria-label="edit"
        />
    )
)
