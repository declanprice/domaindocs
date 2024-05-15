import { Avatar, Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';

import { IoChevronDown } from 'react-icons/io5';

import { Domain } from '@domaindocs/lib';

type DomainSelectorMenuProps = {
    iconOnly: boolean;
    value: Domain;
    options: Domain[];
    onSelect: (domain: Domain) => void;
};

export const DomainSelectorMenu = (props: DomainSelectorMenuProps) => {
    const { value, options, onSelect, iconOnly } = props;

    return (
        <Menu>
            <MenuButton width={'100%'} as={Button} variant={'ghost'} rounded="md">
                <Flex gap={2} alignItems="center" justifyContent="flex-start">
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

                            <Box marginLeft={'auto'}>
                                <IoChevronDown color={'gray.900'} size={12} />
                            </Box>
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
                            onSelect(option);
                        }}
                    >
                        {option.name}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
};
