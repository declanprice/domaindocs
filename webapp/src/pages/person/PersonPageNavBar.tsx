import { Avatar, Button, Divider, Flex, Stack, Text } from '@chakra-ui/react';
import { useUiStore } from '../../state/stores/ui.store';
import { NavButton } from '../../components/nav-button/NavButton';
import { MdArrowBack } from 'react-icons/md';
import { LuListMinus } from 'react-icons/lu';
import { LuNetwork } from 'react-icons/lu';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { DetailedPerson } from '@domaindocs/types';
import { useQuery } from '@tanstack/react-query';
import { peopleApi } from '../../state/api/people-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { PersonPageParams } from './PersonPageParams';

export const PersonPageNavBar = () => {
    const { domainId, userId } = useParams() as PersonPageParams;
    const { isFullNavBar, closeNavBar, openNavBar } = useUiStore();
    const { activeDomain, setActiveDomain } = useUiStore();
    const navigate = useNavigate();

    const { data: person, isLoading } = useQuery<DetailedPerson>({
        queryKey: ['getPerson', { domainId, userId }],
        queryFn: () => peopleApi.get(domainId, userId),
    });

    if (!activeDomain || !person || isLoading) return <LoadingContainer />;

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
                <Avatar
                    name={`${person.person.firstName} ${person.person.lastName}`}
                    src={person.person.iconUri}
                    size={'sm'}
                />

                <Stack spacing={0}>
                    <Text color={'gray.900'} fontSize={14} fontWeight={'400'}>
                        {person.person.firstName} {person.person.lastName}
                    </Text>

                    <Text color={'gray.900'} fontSize={10} fontWeight={'300'}>
                        Person
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
                    to={`/${activeDomain.domainId}/people/${person.person.userId}/overview`}
                />

                <NavButton
                    icon={<LuNetwork color={'gray.900'} size={18} />}
                    label={'Work'}
                    to={`/${activeDomain.domainId}/people/${person.person.userId}/work`}
                />
            </Flex>
        </Flex>
    );
};
