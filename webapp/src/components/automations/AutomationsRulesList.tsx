import { Box, Flex, List, ListItem, Text } from '@chakra-ui/react';
import { BiLogoMicrosoftTeams } from 'react-icons/bi';

export const AutomationsRulesList = () => {
    return (
        <Flex direction="column">
            <Flex borderBottom={'1px solid'} borderColor={'border'} width={'100%'} gap={4} p={1} alignItems="center">
                <Flex alignItems={'center'} gap={4}>
                    <Text fontSize={14} fontWeight={'bold'}>
                        Rules
                    </Text>

                    <Text fontSize={12}>2 Rules</Text>
                </Flex>
            </Flex>

            <List.Root>
                <ListItem
                    display={'flex'}
                    alignItems={'center'}
                    height={'40px'}
                    p={2}
                    gap={3}
                    _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                >
                    <BiLogoMicrosoftTeams color={'purple.300'} />
                    <Text fontSize={12}>When an item is created send a message to a channel</Text>
                </ListItem>
            </List.Root>
        </Flex>
    );
};
