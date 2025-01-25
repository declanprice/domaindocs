import { Badge, Flex, IconButton, List, ListItem, Menu, MenuContent, MenuItem, Text } from '@chakra-ui/react';
import { DomainSettingsPerson } from '@domaindocs/types';
import { TbDots } from 'react-icons/tb';
import React from 'react';
import { Avatar } from '../../../components/ui/avatar';

type DomainPeopleTableProps = {
    people: DomainSettingsPerson[];
};

export const DomainPeopleList = (props: DomainPeopleTableProps) => {
    const { people } = props;

    return (
        <List.Root h={2}>
            {people.map((data) => (
                <ListItem key={data.userId}>
                    <Flex
                        p={1}
                        rounded={4}
                        alignItems={'center'}
                        gap={2}
                        _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                    >
                        <Avatar size={'xs'} src={data.iconUri} name={`${data.firstName} ${data.lastName}`} />

                        <Flex direction={'column'} justifyContent={'center'}>
                            <Text fontSize={12} fontWeight={'normal'}>
                                {data.firstName} {data.lastName}
                                {data.pending && (
                                    <Badge ml="2" colorScheme="orange" fontSize={10}>
                                        Invited
                                    </Badge>
                                )}
                            </Text>

                            <Text fontSize={10}>{data.email}</Text>
                        </Flex>

                        <Menu.Root>
                            <Menu.Trigger
                                variant={'ghost'}
                                ml={'auto'}
                                size={'xs'}
                                as={IconButton}
                                mr={1}
                                icon={<TbDots />}
                            ></Menu.Trigger>

                            <MenuContent>
                                <MenuItem>Remove</MenuItem>
                            </MenuContent>
                        </Menu.Root>
                    </Flex>
                </ListItem>
            ))}
        </List.Root>
    );
};
