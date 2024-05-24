import { Flex, Link, Text } from '@chakra-ui/react';
import { PageToolbar } from '../../components/page/PageToolbar';
import { useNavigate } from 'react-router-dom';
import { MdOutlineManageHistory } from 'react-icons/md';
import { PropsWithChildren } from 'react';

type OnboardingGuidePageToolbarProps = {
    domainId: string;
    guideName?: string;
} & PropsWithChildren;

export const OnboardingGuideFormPageToolbar = (props: OnboardingGuidePageToolbarProps) => {
    const { domainId, guideName, children } = props;

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
                        | {guideName ? `${guideName} | Edit` : 'New Guide'}
                    </Text>
                </Flex>
            }
        >
            {props.children}
        </PageToolbar>
    );
};