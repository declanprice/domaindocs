import { Flex, Text } from '@chakra-ui/react';
import { PageToolbar } from '../../components/page/PageToolbar';
import { MdOutlineManageHistory } from 'react-icons/md';

export const OnboardingPageToolbar = () => {
    return (
        <PageToolbar
            title={
                <Flex alignItems={'center'}>
                    <MdOutlineManageHistory color={'gray.900'} size={14} />
                    <Text ml={2} fontSize={12}>
                        Onboarding
                    </Text>
                </Flex>
            }
        />
    );
};
