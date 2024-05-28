import { useNavigate } from 'react-router-dom';
import { PageToolbar } from '../../components/page/PageToolbar';
import { Flex, Link, Text } from '@chakra-ui/react';
import { WorkArea } from '@domaindocs/types';
import { CiViewColumn } from 'react-icons/ci';
import { LiaThListSolid } from 'react-icons/lia';
import { PiPlugsConnectedLight } from 'react-icons/pi';
import { CiSettings } from 'react-icons/ci';
import { MdWorkOutline } from 'react-icons/md';

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
                    <MdWorkOutline color={'gray.900'} size={14} />
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
                    icon: <LiaThListSolid color={'gray.100'} />,
                    isActive: location.pathname.includes(`/${domainId}/work-areas/${area.id}/backlog`),
                    onClick: () => {
                        navigate(`/${domainId}/work-areas/${area.id}/backlog`);
                    },
                },
                {
                    label: 'Items',
                    icon: <MdWorkOutline color={'gray.100'} />,
                    isActive: location.pathname.includes(`/${domainId}/work-areas/${area.id}/items`),
                    onClick: () => {
                        navigate(`/${domainId}/work-areas/${area.id}/items`);
                    },
                },
                {
                    label: 'Automations',
                    icon: <PiPlugsConnectedLight color={'gray.100'} />,
                    isActive: location.pathname.includes(`/${domainId}/work-areas/${area.id}/automations`),
                    onClick: () => {
                        navigate(`/${domainId}/work-areas/${area.id}/automations`);
                    },
                },
                {
                    label: 'Settings',
                    icon: <CiSettings color={'gray.100'} />,
                    isActive: location.pathname.includes(`/${domainId}/work-areas/${area.id}/settings`),
                    onClick: () => {
                        navigate(`/${domainId}/work-areas/${area.id}/settings`);
                    },
                },
            ]}
        />
    );
};
