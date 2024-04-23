import { Flex, Text } from '@chakra-ui/react';
import { TbUsersGroup } from 'react-icons/tb';
import { PageToolbar } from '../../components/page/PageToolbar';
import { useNavigate } from 'react-router-dom';

type SecretsPageToolbarProps = {
    domainId: string;
};

export const SecretsPageToolbar = (props: SecretsPageToolbarProps) => {
    const { domainId } = props;

    const navigate = useNavigate();

    return (
        <PageToolbar
            title={
                <Flex alignItems={'center'}>
                    <TbUsersGroup color={'gray.900'} size={14} />
                    <Text ml={2} fontSize={12}>
                        Secrets
                    </Text>
                </Flex>
            }
            tabs={[
                {
                    label: 'Relevant',
                    isActive: location.pathname.includes(`/${domainId}/secrets/relevant`),
                    onClick: () => {
                        navigate(`/${domainId}/secrets/relevant`);
                    },
                },
                {
                    label: 'All',
                    isActive: location.pathname.includes(`/${domainId}/secrets/all`),
                    onClick: () => {
                        navigate(`/${domainId}/secrets/all`);
                    },
                },
            ]}
            actions={[
                {
                    label: 'New Secret',
                    onClick: () => {},
                },
            ]}
        />
    );
};
