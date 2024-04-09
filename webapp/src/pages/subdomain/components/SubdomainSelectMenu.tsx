import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { BiChevronDown } from 'react-icons/bi'
import { TbCategory2 } from 'react-icons/tb'
import React from 'react'

export type SubdomainOption = {
    id: string
    name: string
}

export type SubdomainSelectMenuProps = {
    value: SubdomainOption
    options: SubdomainOption[]
    onSelect: (option: SubdomainOption) => void
}

export const SubdomainSelectMenu = (props: SubdomainSelectMenuProps) => {
    const { value, options, onSelect } = props

    return (
        <Menu>
            <MenuButton
                as={Button}
                fontWeight={'regular'}
                variant={'ghost'}
                size={'sm'}
                fontSize={12}
                minWidth={'150px'}
                leftIcon={<TbCategory2 color={'gray.900'} size={14} />}
                rightIcon={<BiChevronDown color={'gray.900'} size={14} />}
            >
                {value.name}
            </MenuButton>

            <MenuList>
                {options.map((option) => (
                    <MenuItem
                        key={option.name}
                        onClick={() => {
                            onSelect(option)
                        }}
                        fontSize={14}
                    >
                        {option.name}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    )
}
