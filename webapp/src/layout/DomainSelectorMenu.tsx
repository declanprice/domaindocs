import {
    Avatar,
    Button,
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
} from '@chakra-ui/react'

import { IoChevronDown } from 'react-icons/io5'

import { Domain } from '@state/api/domain-api.ts'

type DomainSelectorMenuProps = {
    iconOnly: boolean
    value: Domain
    options: Domain[]
    onSelect: (domain: Domain) => void
}

export const DomainSelectorMenu = (props: DomainSelectorMenuProps) => {
    const { value, options, onSelect, iconOnly } = props

    return (
        <Menu>
            <MenuButton
                as={Button}
                variant={'ghost'}
                py={1}
                px={2}
                size={'sm'}
                rounded="md"
            >
                <Flex alignItems="center" gap={2}>
                    <Avatar
                        name={'Registers Of Scotland'}
                        size={'xs'}
                        rounded={'lg'}
                        backgroundColor={'gray.200'}
                    ></Avatar>

                    {!iconOnly && (
                        <>
                            <Text color={'gray.900'} fontSize={12}>
                                {value.name}
                            </Text>
                            <IoChevronDown color={'gray.900'} size={12} />
                        </>
                    )}
                </Flex>
            </MenuButton>

            <MenuList>
                {options.map((option) => (
                    <MenuItem
                        fontSize={12}
                        key={option.domainId}
                        onClick={() => {
                            onSelect(option)
                        }}
                    >
                        {option.name}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    )
}
