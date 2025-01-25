import { Box, Button, Flex, IconButton, Text } from '@chakra-ui/react';
import { CiSettings } from 'react-icons/ci';
import { PiSignOut } from 'react-icons/pi';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '../state/stores/auth.store';
import { DomainPageParams } from '../types/DomainPageParams';
import { Avatar } from '../components/ui/avatar';
import { PopoverContent, PopoverRoot, PopoverTrigger } from '../components/ui/popover';

export const UserMenu = () => {
    const { signOut } = useAuthStore();
    const user = useAuthStore().user;

    const { domainId } = useParams() as DomainPageParams;

    const navigate = useNavigate();

    if (!user) return null;

    const UserMenuButton = (props: { icon: any; label: string; onClick?: () => void }) => {
        const { icon, label, onClick } = props;

        return (
            <Button
                display={'flex'}
                alignItems={'center'}
                justifyContent={'flex-start'}
                gap={2}
                variant={'ghost'}
                onClick={onClick}
                fontWeight={'regular'}
            >
                {icon}

                <Text color={'gray.900'}>{label}</Text>
            </Button>
        );
    };

    return (
        <PopoverRoot>
            <PopoverTrigger>
                <IconButton aria-label={'notification'} variant={'ghost'}>
                    <Avatar size={'xs'} name={`${user.firstName} ${user.lastName}`} />
                </IconButton>
            </PopoverTrigger>

            <PopoverContent width={'220px'} p={2} mr={2} mt={1}>
                <Flex direction={'column'} gap={1}>
                    <Text mt={2} mb={2} ml={2} textStyle={'md'}>
                        Declan Price
                    </Text>

                    <UserMenuButton
                        label={'User settings'}
                        icon={<CiSettings />}
                        onClick={() => {
                            navigate(`/${domainId}/user-settings`);
                        }}
                    />

                    <Box divideX={'1px'} />

                    <UserMenuButton
                        label={'Sign Out'}
                        icon={<PiSignOut />}
                        onClick={() => {
                            signOut().then();
                            navigate('/auth/sign-in');
                        }}
                    />
                </Flex>
            </PopoverContent>
        </PopoverRoot>
    );
};
