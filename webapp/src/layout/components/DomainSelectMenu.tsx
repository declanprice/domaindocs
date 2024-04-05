import { Avatar, Flex, Menu, MenuButton, Text } from '@chakra-ui/react'
import { IoChevronDown } from 'react-icons/io5'

export const DomainSelectorMenu = () => {
    return (
        <Menu>
            <MenuButton
                _hover={{ backgroundColor: 'gray.100' }}
                p={2}
                rounded="md"
            >
                <Flex alignItems="center" gap={2}>
                    <Avatar
                        name={'Registers Of Scotland'}
                        size={'xs'}
                        rounded={'md'}
                        backgroundColor={'gray.200'}
                    ></Avatar>
                    <Text color={'gray.900'} fontSize={14}>
                        Registers Of Scotland
                    </Text>
                    <IoChevronDown />
                </Flex>
            </MenuButton>
        </Menu>
    )
}

export const SimpleDomainSelectorMenu = () => {
    return (
        <Menu>
            <MenuButton
                _hover={{ backgroundColor: 'gray.100' }}
                p={2}
                rounded="md"
            >
                <Flex alignItems="center" gap={2}>
                    <Avatar
                        name={'Registers Of Scotland'}
                        size={'xs'}
                        rounded={'md'}
                        backgroundColor={'gray.200'}
                    ></Avatar>
                </Flex>
            </MenuButton>
        </Menu>
    )
}
