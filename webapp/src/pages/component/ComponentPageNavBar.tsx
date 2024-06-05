import { Button, Divider, Flex, Stack, Text } from '@chakra-ui/react';
import { useUiStore } from '../../state/stores/ui.store';
import { NavButton } from '../../components/nav-button/NavButton';
import { MdArrowBack, MdOutlineCompareArrows } from 'react-icons/md';
import { LuComponent, LuListMinus, LuSettings } from 'react-icons/lu';
import { LuNetwork } from 'react-icons/lu';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailedComponent } from '@domaindocs/types';
import { useQuery } from '@tanstack/react-query';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { componentsApi } from '../../state/api/components-api';
import { ComponentPageParams } from './ComponentPageParams';
import { GrAnnounce } from 'react-icons/gr';

export const ComponentPageNavBar = () => {
    const { domainId, componentId } = useParams() as ComponentPageParams;
    const { isFullNavBar, closeNavBar, openNavBar } = useUiStore();
    const { activeDomain, setActiveDomain } = useUiStore();
    const navigate = useNavigate();

    const { data: component, isLoading } = useQuery<DetailedComponent>({
        queryKey: ['getComponent', { domainId, componentId }],
        queryFn: () => componentsApi.getComponent(domainId, componentId),
    });

    if (!activeDomain || !component || isLoading) return <LoadingContainer />;

    return (
        <Flex
            height={'100%'}
            width={isFullNavBar ? '250px' : '55px'}
            minWidth={isFullNavBar ? '250px' : '55px'}
            background={'lightgray'}
            direction={'column'}
            borderRight={'1px solid'}
            borderColor={'border'}
            p={2}
            align={'center'}
            gap={2}
        >
            <Button
                variant={'ghost'}
                size={'sm'}
                leftIcon={<MdArrowBack />}
                width={'100%'}
                justifyContent={'flex-start'}
                mt={2}
                fontWeight={'300'}
                onClick={() => {
                    navigate(`/${activeDomain.domainId}/people`);
                }}
            >
                Go back
            </Button>

            <Divider />

            <Flex mt={2} px={4} width={'100%'} gap={2} alignItems="center">
                <Flex alignItems={'center'} backgroundColor={'teal.400'} rounded={6} p={2}>
                    <LuComponent color={'white'} />
                </Flex>

                <Stack spacing={0}>
                    <Text color={'gray.900'} fontSize={14} fontWeight={'400'}>
                        {component.component.name}
                    </Text>

                    <Text color={'gray.900'} fontSize={10} fontWeight={'300'}>
                        Component
                    </Text>
                </Stack>
            </Flex>

            <Flex
                mt={4}
                width={'100%'}
                direction={'column'}
                borderBottom={'1px solid'}
                borderColor={'border'}
                overflowY={'auto'}
                flex={1}
                gap={2}
                display={'flex'}
                flexDir={'column'}
            >
                <NavButton
                    label={'Overview'}
                    icon={<LuListMinus color={'gray.900'} size={18} />}
                    to={`/${activeDomain.domainId}/components/${componentId}/overview`}
                />

                <NavButton
                    icon={<HiOutlineDocumentText color={'gray.900'} size={18} />}
                    label={'Docs'}
                    to={`/${activeDomain.domainId}/components/${componentId}/docs`}
                />

                <NavButton
                    icon={<MdOutlineCompareArrows color={'gray.900'} size={18} />}
                    label={'Dependencies'}
                    to={`/${activeDomain.domainId}/components/${componentId}/deps`}
                />

                <NavButton
                    icon={<GrAnnounce color={'gray.900'} size={18} />}
                    label={'Announcements'}
                    to={`/${activeDomain.domainId}/components/${componentId}/announcements`}
                />

                <NavButton
                    icon={<LuNetwork color={'gray.900'} size={18} />}
                    label={'Work'}
                    to={`/${activeDomain.domainId}/components/${componentId}/work`}
                />

                <NavButton
                    icon={<LuSettings color={'gray.900'} size={18} />}
                    label={'Settings'}
                    to={`/${activeDomain.domainId}/components/${componentId}/settings`}
                />
            </Flex>
        </Flex>
    );
};
