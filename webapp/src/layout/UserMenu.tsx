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
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../state/stores/auth.store';

export const UserMenu = () => {
  const { signOut } = useAuthStore();

  const navigate = useNavigate();

  const UserMenuButton = (props: {
    icon: any;
    label: string;
    onClick?: () => void;
  }) => {
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
          size={'xs'}
          variant={'ghost'}
          _hover={{ backgroundColor: 'gray.700' }}
          _active={{ backgroundColor: 'gray.700' }}
          icon={
            <Avatar
              height={4}
              width={4}
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
            />
          }
        />
      </PopoverTrigger>

      <PopoverContent width={'220px'} p={2}>
        <Flex direction={'column'} gap={2}>
          <Text mt={2} ml={2} fontSize={'sm'}>
            Declan Price
          </Text>

          <UserMenuButton label={'User settings'} icon={<CiSettings />} />

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
