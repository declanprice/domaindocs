import { Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { PageToolbar } from '../../components/page/PageToolbar';

import { FiHome } from 'react-icons/fi';

export type HomePageToolbarProps = {
    domainId: string;
};

export const HomePageToolbar = (props: HomePageToolbarProps) => {
    const { domainId } = props;

    const navigate = useNavigate();

    return (
        <>
            <PageToolbar
                title={
                    <Flex alignItems={'center'}>
                        <FiHome color={'gray.900'} size={18} />
                        <Text ml={2} fontSize={12}>
                            Home
                        </Text>
                    </Flex>
                }
                tabs={[
                    {
                        label: 'Dashboard',
                        isActive: location.pathname.includes(`/${domainId}/home/dashboard`),
                        onClick: () => {
                            navigate(`/${domainId}/home/dashboard`);
                        },
                    },
                    {
                        label: 'Notice Board',
                        isActive: location.pathname.includes(`/${domainId}/home/notice-board`),
                        onClick: () => {
                            navigate(`/${domainId}/home/notice-board`);
                        },
                    },
                    {
                        label: 'Docs',
                        isActive: location.pathname.includes(`/${domainId}/home/docs`),
                        onClick: () => {
                            navigate(`/${domainId}/home/docs`);
                        },
                    },
                ]}
            />
        </>
    );
};
