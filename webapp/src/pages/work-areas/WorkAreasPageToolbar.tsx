import { Flex, Text } from '@chakra-ui/react';
import { PageToolbar } from '../../components/page/PageToolbar';
import { SiReacthookform } from 'react-icons/si';

export const WorkAreasPageToolbar = () => {
    return (
        <PageToolbar
            title={
                <Flex alignItems={'center'}>
                    <SiReacthookform color={'gray.900'} size={18} />
                    <Text ml={2} fontSize={12}>
                        Work Areas
                    </Text>
                </Flex>
            }
        />
    );
};
