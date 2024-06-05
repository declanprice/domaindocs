import { Button, Divider, Flex, Stack, Text } from '@chakra-ui/react';
import { useUiStore } from '../../state/stores/ui.store';
import { NavButton } from '../../components/nav-button/NavButton';
import { MdArrowBack } from 'react-icons/md';
import { LuListMinus, LuSettings } from 'react-icons/lu';
import { LuNetwork } from 'react-icons/lu';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailedTeam } from '@domaindocs/types';
import { useQuery } from '@tanstack/react-query';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { teamsApi } from '../../state/api/teams-api';
import { TeamPageParams } from './TeamPageParams';
import { GoPeople } from 'react-icons/go';
import { HiOutlineDocumentText } from 'react-icons/hi';

export const TeamPageNavBar = () => {
    const { domainId, teamId } = useParams() as TeamPageParams;
    const { isFullNavBar, closeNavBar, openNavBar } = useUiStore();
    const { activeDomain, setActiveDomain } = useUiStore();
    const navigate = useNavigate();

    const { data: team, isLoading } = useQuery<DetailedTeam>({
        queryKey: ['getTeam', { domainId, teamId }],
        queryFn: () => teamsApi.get(domainId, teamId),
    });

    if (!activeDomain || !team || isLoading) return <LoadingContainer />;

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
                <Flex alignItems={'center'} backgroundColor={'purple.400'} rounded={6} p={2}>
                    <GoPeople color={'white'} />
                </Flex>

                <Stack spacing={0}>
                    <Text color={'gray.900'} fontSize={14} fontWeight={'400'}>
                        {team.team.name}
                    </Text>

                    <Text color={'gray.900'} fontSize={10} fontWeight={'300'}>
                        Team
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
                    to={`/${activeDomain.domainId}/teams/${team.team.teamId}/overview`}
                />

                <NavButton
                    icon={<HiOutlineDocumentText color={'gray.900'} size={18} />}
                    label={'Docs'}
                    to={`/${activeDomain.domainId}/teams/${team.team.teamId}/docs`}
                />

                <NavButton
                    icon={<LuNetwork color={'gray.900'} size={18} />}
                    label={'Work'}
                    to={`/${activeDomain.domainId}/teams/${team.team.teamId}/work`}
                />

                <NavButton
                    icon={<LuSettings color={'gray.900'} size={18} />}
                    label={'Settings'}
                    to={`/${activeDomain.domainId}/teams/${team.team.teamId}/settings`}
                />
            </Flex>
        </Flex>
    );
};
