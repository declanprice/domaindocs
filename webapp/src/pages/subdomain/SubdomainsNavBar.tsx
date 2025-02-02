import { Button, Box, Flex, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { DetailedSubdomain } from '@domaindocs/types';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { useUiStore } from '../../state/stores/ui.store';
import { NavButton } from '../../components/nav-button/NavButton';
import { MdArrowBack } from 'react-icons/md';
import { LuListMinus, LuSettings } from 'react-icons/lu';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar } from '../../components/ui/avatar';
import { SubdomainPageParams } from '../../types/SubdomainPageParams';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { subdomainsApi } from '../../state/api/subdomains-api';
import { GoPeople } from 'react-icons/go';
import { VscTypeHierarchySub } from 'react-icons/vsc';

export const SubdomainsNavBar = () => {
    const { domainId, subdomainId } = useParams() as SubdomainPageParams;
    const { isFullNavBar } = useUiStore();
    const navigate = useNavigate();

    const { data, isLoading } = useQuery<DetailedSubdomain>({
        queryKey: ['getSubdomain', { domainId, subdomainId }],
        queryFn: () => subdomainsApi.get(domainId, subdomainId),
    });

    if (!data || isLoading) return <LoadingContainer />;

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
                width={'100%'}
                justifyContent={'flex-start'}
                mt={2}
                fontWeight={'300'}
                onClick={() => {
                    navigate(`/${domainId}/subdomains`);
                }}
            >
                <MdArrowBack /> Go back
            </Button>

            <Box divideX={'1px'} />

            <Flex mt={2} px={4} width={'100%'} gap={3} alignItems="center" direction={'row'}>
                <Flex alignItems={'center'} backgroundColor={'green.600'} rounded={6} p={2}>
                    <VscTypeHierarchySub color={'white'} />
                </Flex>

                <Flex direction={'column'}>
                    <Text
                        color={'gray.900'}
                        fontSize={14}
                        fontWeight={'400'}
                        maxWidth={'170px'}
                        textOverflow={'ellipsis'}
                        overflow={'hidden'}
                        whiteSpace={'nowrap'}
                    >
                        {data.subdomain.name}
                    </Text>

                    <Text color={'gray.900'} fontSize={12} fontWeight={'300'}>
                        Subdomain
                    </Text>
                </Flex>
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
                    to={`/${domainId}/subdomains/${subdomainId}/overview`}
                />

                <NavButton
                    icon={<HiOutlineDocumentText color={'gray.900'} size={18} />}
                    label={'Docs'}
                    to={`/${domainId}/subdomains/${subdomainId}/docs`}
                />

                <NavButton
                    icon={<LuSettings color={'gray.900'} size={18} />}
                    label={'Settings'}
                    to={`/${domainId}/subdomains/${subdomainId}/settings`}
                />
            </Flex>
        </Flex>
    );
};
