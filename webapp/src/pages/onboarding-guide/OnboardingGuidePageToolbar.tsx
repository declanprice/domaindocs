import { Flex, Link, Text } from '@chakra-ui/react';
import { TbUsersGroup } from 'react-icons/tb';
import { PageToolbar } from '../../components/page/PageToolbar';
import { useNavigate } from 'react-router-dom';
import { MdOutlineManageHistory } from 'react-icons/md';

type OnboardingGuidePageToolbarProps = {
    domainId: string;
    guideName: string;
};
export const OnboardingGuidePageToolbar = (props: OnboardingGuidePageToolbarProps) => {
    const { domainId, guideName } = props;

    const navigate = useNavigate();

    return (
        <PageToolbar
            title={
                <Flex alignItems={'center'}>
                    <MdOutlineManageHistory color={'gray.900'} size={14} />

                    <Text ml={2} fontSize={12}>
                        <Link
                            href={undefined}
                            onClick={() => {
                                navigate(`/${domainId}/onboarding`);
                            }}
                        >
                            Onboarding
                        </Link>{' '}
                        | {guideName}
                    </Text>
                </Flex>
            }
        />
    );
};
