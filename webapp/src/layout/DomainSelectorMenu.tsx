import { Avatar, Flex, Menu, MenuButton, Text } from '@chakra-ui/react'
import { IoChevronDown } from 'react-icons/io5'

export const DomainSelectorMenu = () => {
    return (
        <Menu>
            <MenuButton
                _hover={{ backgroundColor: 'gray.100' }}
                py={1}
                px={2}
                rounded="md"
            >
                <Flex alignItems="center" gap={2}>
                    <Avatar
                        name={'Registers Of Scotland'}
                        size={'xs'}
                        rounded={'lg'}
                        backgroundColor={'gray.200'}
                    ></Avatar>
                    <Text color={'gray.900'} fontSize={12}>
                        Registers Of Scotland
                    </Text>
                    <IoChevronDown color={'gray.900'} size={12} />
                </Flex>
            </MenuButton>
        </Menu>
    )
}
