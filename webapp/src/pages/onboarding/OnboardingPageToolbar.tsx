import { Flex, Text } from '@chakra-ui/react';
import { TbUsersGroup } from 'react-icons/tb';
import { PageToolbar } from '../../components/page/PageToolbar';

export const OnboardingPageToolbar = () => {
    return (
        <PageToolbar
            title={
                <Flex alignItems={'center'}>
                    <TbUsersGroup color={'gray.900'} size={14} />
                    <Text ml={2} fontSize={12}>
                        Onboarding
                    </Text>
                </Flex>
            }
            actions={[
                {
                    label: 'New Guide',
                    onClick: () => {},
                },
            ]}
        />
    );
};
