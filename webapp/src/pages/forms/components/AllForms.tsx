import {
    Avatar,
    Divider,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    List,
    ListItem,
    Stack,
    Text,
} from '@chakra-ui/react';
import { BiSearch } from 'react-icons/bi';

export const AllForms = () => {
    return (
        <Flex direction={'column'} gap={3}>
            <Flex>
                <Text fontSize={16}>All Forms</Text>
            </Flex>

            <InputGroup size={'sm'} maxWidth={'300px'}>
                <InputLeftElement pointerEvents="none">
                    <BiSearch color="gray.900" />
                </InputLeftElement>
                <Input variant={'filled'} placeholder="Search forms" backgroundColor={'lightgray'} />
            </InputGroup>

            <List spacing={2}>
                <ListItem
                    display={'flex'}
                    flexDirection={'column'}
                    p={3}
                    backgroundColor={'lightgray'}
                    rounded={4}
                    gap={2}
                    _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                    width={'240px'}
                >
                    <Text fontSize={14}>Deed Search Bug</Text>

                    <Text fontSize={12}>i am a description</Text>
                </ListItem>
            </List>
        </Flex>
    );
};
