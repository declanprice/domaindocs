import { Flex, Link, Text } from '@chakra-ui/react';
import { PageToolbar } from '../../components/page/PageToolbar';
import { useNavigate } from 'react-router-dom';
import { SiReacthookform } from 'react-icons/si';

type FormPageToolbarProps = {
    domainId: string;
    formId: string;
};

export const FormPageToolbar = (props: FormPageToolbarProps) => {
    const { domainId, formId } = props;

    const navigate = useNavigate();

    return (
        <PageToolbar
            title={
                <Flex alignItems={'center'}>
                    <SiReacthookform color={'gray.900'} size={14} />
                    <Text ml={2} fontSize={12}>
                        <Link
                            onClick={() => {
                                navigate(`/${domainId}/forms`);
                            }}
                        >
                            Forms{' '}
                        </Link>
                        | Test Form
                    </Text>
                </Flex>
            }
            tabs={[
                {
                    label: 'Overview',
                    isActive: location.pathname.includes(`/${domainId}/forms/1/overview`),
                    onClick: () => {
                        navigate(`/${domainId}/projects/forms/1/overview`);
                    },
                },
                {
                    label: 'Fields',
                    isActive: location.pathname.includes(`/${domainId}/forms/1/fields`),
                    onClick: () => {
                        navigate(`/${domainId}/forms/1/fields`);
                    },
                },
                {
                    label: 'Integrations',
                    isActive: location.pathname.includes(`/${domainId}/forms/1/integrations`),
                    onClick: () => {
                        navigate(`/${domainId}/forms/1/integrations`);
                    },
                },
                {
                    label: 'Settings',
                    isActive: location.pathname.includes(`/${domainId}/forms/1/settings`),
                    onClick: () => {
                        navigate(`/${domainId}/forms/1/settings`);
                    },
                },
            ]}
        />
    );
};
