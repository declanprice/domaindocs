import { useNavigate } from 'react-router-dom';
import { PageToolbar } from '../../components/page/PageToolbar';
import { Flex, Link, Text } from '@chakra-ui/react';
import { SiReacthookform } from 'react-icons/si';
import { WorkArea } from '@domaindocs/types';
import { CiViewColumn } from 'react-icons/ci';
import { FaRegClipboard } from 'react-icons/fa';

type WorkAreaPageToolbarProps = {
    domainId: string;
    area: WorkArea;
};

export const WorkAreaPageToolbar = (props: WorkAreaPageToolbarProps) => {
    const { domainId, area } = props;

    const navigate = useNavigate();

    return (
        <PageToolbar
            title={
                <Flex alignItems={'center'}>
                    <SiReacthookform color={'gray.900'} size={14} />
                    <Text ml={2} fontSize={12}>
                        <Link
                            onClick={() => {
                                navigate(`/${domainId}/work-areas`);
                            }}
                        >
                            Work Areas{' '}
                        </Link>
                        | {area.name}
                    </Text>
                </Flex>
            }
            tabs={[
                {
                    label: 'Board',
                    icon: <CiViewColumn color={'gray.100'} />,
                    isActive: location.pathname.includes(`/${domainId}/work-areas/${area.id}/board`),
                    onClick: () => {
                        navigate(`/${domainId}/work-areas/${area.id}/board`);
                    },
                },
                {
                    label: 'Backlog',
                    icon: <FaRegClipboard color={'gray.100'} />,
                    isActive: location.pathname.includes(`/${domainId}/work-areas/${area.id}/backlog`),
                    onClick: () => {
                        navigate(`/${domainId}/work-areas/${area.id}/backlog`);
                    },
                },
                {
                    label: 'Items',
                    icon: <FaRegClipboard color={'gray.100'} />,
                    isActive: location.pathname.includes(`/${domainId}/work-areas/${area.id}/items`),
                    onClick: () => {
                        navigate(`/${domainId}/work-areas/${area.id}/items`);
                    },
                },
                {
                    label: 'Integrations',
                    icon: <FaRegClipboard color={'gray.100'} />,
                    isActive: location.pathname.includes(`/${domainId}/work-areas/${area.id}/integrations`),
                    onClick: () => {
                        navigate(`/${domainId}/work-areas/${area.id}/integrations`);
                    },
                },
                {
                    label: 'Settings',
                    icon: <FaRegClipboard color={'gray.100'} />,
                    isActive: location.pathname.includes(`/${domainId}/work-areas/${area.id}/settings`),
                    onClick: () => {
                        navigate(`/${domainId}/work-areas/${area.id}/settings`);
                    },
                },
            ]}
        />
    );
};
