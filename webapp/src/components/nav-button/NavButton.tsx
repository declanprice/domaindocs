import { Button, Text } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

type NavButtonProps = {
    icon: any;
    label: string;
    to: string;
    rightIcon?: any;
};

export const NavButton = (props: NavButtonProps) => {
    const { rightIcon } = props;

    const navigate = useNavigate();

    const location = useLocation();

    const { icon, label, to } = props;

    const isActive = location.pathname === to;

    return (
        <Button
            key={props.label}
            variant={'ghost'}
            colorScheme={'gray'}
            alignItems={'center'}
            display={'flex'}
            fontWeight={'regular'}
            justifyContent={'flex-start'}
            isActive={isActive}
            size={'md'}
            rightIcon={rightIcon}
            _active={{
                backgroundColor: 'gray.100',
            }}
            gap={2}
            width={'100%'}
            onClick={() => {
                navigate(to);
            }}
            leftIcon={icon}
        >
            <Text fontSize={12} color={'gray.900'} fontWeight={'300'} flex={1} textAlign={'start'}>
                {label}
            </Text>
        </Button>
    );
};
