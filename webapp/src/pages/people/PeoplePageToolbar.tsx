import { Flex, Text } from '@chakra-ui/react';
import { PageToolbar } from '../../components/page/PageToolbar';
import { MdOutlinePerson } from 'react-icons/md';

export const PeoplePageToolbar = () => {
    return (
        <PageToolbar
            title={
                <Flex alignItems={'center'}>
                    <MdOutlinePerson color={'gray.900'} size={18} />
                    <Text ml={2} fontSize={12}>
                        People
                    </Text>
                </Flex>
            }
        />
    );
};
