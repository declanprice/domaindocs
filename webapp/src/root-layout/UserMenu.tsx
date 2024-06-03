import {
    Avatar,
    Button,
    Divider,
    Flex,
    IconButton,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Text,
} from '@chakra-ui/react';
import { CiSettings } from 'react-icons/ci';
import { PiSignOut } from 'react-icons/pi';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '../state/stores/auth.store';
import { DomainPageParams } from '../types/DomainPageParams';

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
                size={'sm'}
                variant={'ghost'}
                onClick={onClick}
                fontWeight={'regular'}
            >
                {icon}

                <Text fontSize={12} color={'gray.900'}>
                    {label}
                </Text>
            </Button>
        );
    };

    return (
        <Popover>
            <PopoverTrigger>
                <IconButton
                    aria-label={'notification'}
                    variant={'ghost'}
                    icon={<Avatar size={'sm'} name={`${user.firstName} ${user.lastName}`} />}
                />
            </PopoverTrigger>

            <PopoverContent width={'220px'} p={2} mr={2} mt={1}>
                <Flex direction={'column'} gap={2}>
                    <Text mt={2} ml={2} fontSize={'sm'}>
                        Declan Price
                    </Text>

                    <UserMenuButton
                        label={'User settings'}
                        icon={<CiSettings />}
                        onClick={() => {
                            navigate(`/${domainId}/user-settings`);
                        }}
                    />

                    <Divider />

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
        </Popover>
    );
};
