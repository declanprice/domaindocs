import { Badge, Flex, IconButton, Text } from '@chakra-ui/react';
import { DomainSettingsPerson } from '@domaindocs/types';
import { TbDots } from 'react-icons/tb';
import React from 'react';
import { Avatar } from '../../../components/ui/avatar';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '../../../components/ui/menu';

type DomainPeopleTableProps = {
    people: DomainSettingsPerson[];
};

export const DomainPeopleList = (props: DomainPeopleTableProps) => {
    const { people } = props;

    return (
        <ul>
            {people.map((data) => (
                <li>
                    <Flex
                        p={1}
                        rounded={4}
                        alignItems={'center'}
                        gap={2}
                        _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                    >
                        <Avatar src={data.iconUri} name={`${data.firstName} ${data.lastName}`} />

                        <Flex direction={'column'} justifyContent={'center'} ml={2}>
                            <Text fontWeight={'normal'}>
                                {data.firstName} {data.lastName}
                                {data.pending && (
                                    <Badge ml="2" colorScheme="orange">
                                        Invited
                                    </Badge>
                                )}
                            </Text>

                            <Text>{data.email}</Text>
                        </Flex>

                        <MenuRoot>
                            <MenuTrigger variant={'ghost'} ml={'auto'} as={IconButton} mr={1}>
                                <TbDots />
                            </MenuTrigger>

                            <MenuContent>
                                <MenuItem>Remove</MenuItem>
                            </MenuContent>
                        </MenuRoot>
                    </Flex>
                </li>
            ))}
        </ul>
    );
};
