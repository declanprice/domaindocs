import { Box, Button, Flex, IconButton, Text } from '@chakra-ui/react';
import { CiSearch } from 'react-icons/ci';
import { UserMenu } from './UserMenu';
import { DomainSelectorMenu } from './DomainSelectorMenu';
import { useUiStore } from '../state/stores/ui.store';
import { useAuthStore } from '../state/stores/auth.store';
import { LuInbox } from 'react-icons/lu';
import { IoHelpCircle } from 'react-icons/io5';
import { IoIosHelpCircleOutline } from 'react-icons/io';
import { LuHelpCircle } from 'react-icons/lu';
export const HeadingToolbar = () => {
    const domains = useAuthStore((state) => state.user?.domains);

    const { activeDomain, setActiveDomain } = useUiStore();

    if (!domains || !activeDomain) return 'active domains not set.';

    return (
        <Flex
            backgroundColor={'white'}
            borderBottom={'1px solid'}
            borderColor={'border'}
            alignItems={'center'}
            height={'50px'}
            minHeight={'50px'}
            px={2}
        >
            <DomainSelectorMenu value={activeDomain} options={domains} onSelect={setActiveDomain} />

            <Flex alignItems={'center'} gap={4} ml={'auto'}>
                <Button width={'250px'} size={'sm'} variant={'outline'} color={'gray.900'} fontWeight={'300'}>
                    <Flex alignItems={'center'}>
                        <CiSearch />
                        <Text ml={2}>search {activeDomain.name.toLowerCase()}</Text>
                    </Flex>
                </Button>

                <IconButton variant={'ghost'} size={'sm'} aria-label={'inbox-button'} icon={<LuInbox />} />

                <IconButton variant={'ghost'} size={'sm'} aria-label={'help-button'} icon={<LuHelpCircle />} />

                <UserMenu />
            </Flex>
        </Flex>
    );
};
