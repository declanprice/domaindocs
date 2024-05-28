import { Avatar, Button, ButtonGroup, Divider, Flex, List, ListItem, Text } from '@chakra-ui/react';
import { IoSearchOutline } from 'react-icons/io5';
import { CiFilter } from 'react-icons/ci';
import { BiBook } from 'react-icons/bi';
import { BiLogoMicrosoftTeams } from 'react-icons/bi';
export const AutomationsRulesList = () => {
    return (
        <Flex direction="column">
            <Flex
                borderTop={'1px solid'}
                borderBottom={'1px solid'}
                borderColor={'border'}
                width={'100%'}
                gap={4}
                p={1}
                alignItems="center"
            >
                <Flex alignItems={'center'} gap={4}>
                    <Text fontSize={14} fontWeight={'bold'}>
                        Rules
                    </Text>

                    <Text fontSize={12}>2 Rules</Text>
                </Flex>

                <Flex ml={'auto'}>
                    <ButtonGroup gap={0}>
                        <Button size={'sm'} variant={'ghost'} colorScheme={'gray'}>
                            <IoSearchOutline fontSize={18} color={'gray.900'} />
                        </Button>

                        <Button size={'sm'} variant={'ghost'} colorScheme={'gray'}>
                            <CiFilter fontSize={18} color={'gray.900'} />
                        </Button>
                    </ButtonGroup>
                </Flex>
            </Flex>

            <List>
                <ListItem
                    display={'flex'}
                    alignItems={'center'}
                    height={'40px'}
                    p={2}
                    gap={3}
                    _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                >
                    <BiLogoMicrosoftTeams />
                    <Text fontSize={12}>When an item is created send a message to a channel</Text>
                </ListItem>
            </List>
        </Flex>
    );
};
