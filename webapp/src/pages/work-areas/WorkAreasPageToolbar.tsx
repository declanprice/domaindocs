import { Flex, Text } from '@chakra-ui/react';
import { PageToolbar } from '../../components/page/PageToolbar';
import { MdWorkOutline } from 'react-icons/md';

export const WorkAreasPageToolbar = () => {
    return (
        <PageToolbar
            title={
                <Flex alignItems={'center'}>
                    <MdWorkOutline color={'gray.900'} size={18} />
                    <Text ml={2} fontSize={12}>
                        Work Areas
                    </Text>
                </Flex>
            }
        />
    );
};
