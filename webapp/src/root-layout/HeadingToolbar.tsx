import { Button, Flex, IconButton, Text } from '@chakra-ui/react';
import { CiSearch } from 'react-icons/ci';
import { DomainSelectorMenu } from './DomainSelectorMenu';
import { useUiStore } from '../state/stores/ui.store';
import { useAuthStore } from '../state/stores/auth.store';
import { LuCircleHelp, LuInbox } from 'react-icons/lu';
import { UserMenu } from './UserMenu';

export const HeadingToolbar = () => {
    const domains = useAuthStore((state) => state.user?.domains);

    const { activeDomain, setActiveDomain } = useUiStore();

    if (!domains || !activeDomain) return 'active domains not set.';

    return (
        <Flex backgroundColor={'white'} borderBottom={'1px solid'} borderColor={'border'} alignItems={'center'} p={2}>
            <DomainSelectorMenu value={activeDomain} options={domains} onSelect={setActiveDomain} />

            <Flex alignItems={'center'} gap={4} ml={'auto'}>
                <Button width={'250px'} variant={'outline'} colorPalette={'gray'} fontWeight={'300'}>
                    <Flex alignItems={'center'}>
                        <CiSearch />
                        <Text ml={2}>search {activeDomain.name.toLowerCase()}</Text>
                    </Flex>
                </Button>

                <IconButton variant={'ghost'} aria-label={'inbox-button'}>
                    <LuInbox />
                </IconButton>

                <IconButton variant={'ghost'} aria-label={'help-button'}>
                    <LuCircleHelp />
                </IconButton>

                <UserMenu />
            </Flex>
        </Flex>
    );
};
