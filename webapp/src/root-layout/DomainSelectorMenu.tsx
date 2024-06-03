import { Domain } from '@domaindocs/types';
import { Avatar, Box, Button, Divider, Flex, Popover, PopoverContent, PopoverTrigger, Text } from '@chakra-ui/react';
import { PiPlugsConnected } from 'react-icons/pi';
import { IoChevronDown } from 'react-icons/io5';
import { CiSettings } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';

type DomainSelectorMenuProps = {
    value: Domain;
    options: Domain[];
    onSelect: (domain: Domain) => void;
};

export const DomainSelectorMenu = (props: DomainSelectorMenuProps) => {
    const { value, options, onSelect } = props;

    const navigate = useNavigate();

    const MenuButton = (props: { icon: any; label: string; onClick?: () => void }) => {
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
            >
                {icon}

                <Text fontSize={12} color={'gray.900'} fontWeight={'400'}>
                    {label}
                </Text>
            </Button>
        );
    };

    return (
        <Popover>
            <PopoverTrigger>
                <Button size={'md'} aria-label={'domain selector button'} variant={'ghost'}>
                    <Flex width={'100%'} gap={2} alignItems="center">
                        <Avatar name={value.name} size={'sm'} rounded={'lg'} />

                        <Text color={'gray.900'} fontSize={12} fontWeight={'400'}>
                            {value.name}
                        </Text>

                        <Box marginLeft={'auto'}>
                            <IoChevronDown color={'gray.900'} size={12} />
                        </Box>
                    </Flex>
                </Button>
            </PopoverTrigger>

            <PopoverContent width={'220px'} ml={2}>
                <Flex direction={'column'} gap={2} p={2}>
                    <Text mt={2} ml={2} fontSize={'sm'}>
                        {value.name}
                    </Text>

                    <MenuButton
                        label={'Settings'}
                        icon={<CiSettings />}
                        onClick={() => {
                            navigate(`/${value.domainId}/settings`);
                        }}
                    />

                    <MenuButton
                        label={'Integrations'}
                        icon={<PiPlugsConnected />}
                        onClick={() => {
                            navigate(`/${value.domainId}/integrations`);
                        }}
                    />

                    <Divider />

                    <Text mt={2} ml={2} fontSize={'xs'}>
                        Switch Domains
                    </Text>

                    {options.map((option) => (
                        <Button
                            key={option.domainId}
                            width={'100%'}
                            aria-label={'domain selector button'}
                            variant={'ghost'}
                        >
                            <Flex width={'100%'} gap={2} alignItems="center">
                                <Avatar name={option.name} size={'xs'} rounded={'lg'}></Avatar>

                                <Text color={'gray.900'} fontSize={12} fontWeight={'400'}>
                                    {option.name}
                                </Text>
                            </Flex>
                        </Button>
                    ))}
                </Flex>
            </PopoverContent>
        </Popover>
    );
};
