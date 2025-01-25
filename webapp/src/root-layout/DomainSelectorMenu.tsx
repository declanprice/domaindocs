import { Domain } from '@domaindocs/types';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { PiPlugsConnected } from 'react-icons/pi';
import { IoChevronDown } from 'react-icons/io5';
import { CiSettings } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '../components/ui/avatar';
import { PopoverBody, PopoverContent, PopoverRoot, PopoverTrigger } from '../components/ui/popover';

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
                variant={'ghost'}
                onClick={onClick}
            >
                {icon}

                <Text color={'gray.900'} fontWeight={'400'}>
                    {label}
                </Text>
            </Button>
        );
    };

    return (
        <PopoverRoot>
            <PopoverTrigger>
                <Button maxWidth={'250px'} aria-label={'domain selector button'} variant={'ghost'} pb={6} pt={6}>
                    <Flex width={'100%'} gap={2} alignItems="center">
                        <Avatar name={value.name} size={'xs'} rounded={'lg'} />

                        <Text
                            color={'gray.900'}
                            fontWeight={'400'}
                            overflow={'hidden'}
                            textOverflow={'ellipsis'}
                            whiteSpace={'nowrap'}
                        >
                            {value.name}
                        </Text>

                        <Box marginLeft={'auto'}>
                            <IoChevronDown color={'gray.900'} size={12} />
                        </Box>
                    </Flex>
                </Button>
            </PopoverTrigger>

            <PopoverContent>
                <PopoverBody>
                    <Flex direction={'column'} gap={2}>
                        <Text textStyle={'md'}>{value.name}</Text>

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

                        <Box divideX={'1px'} />

                        <Text textStyle={'md'}>Switch Domains</Text>

                        {options.map((option) => (
                            <Button
                                key={option.domainId}
                                width={'100%'}
                                aria-label={'domain selector button'}
                                variant={'ghost'}
                                pb={6}
                                pt={6}
                            >
                                <Flex width={'100%'} gap={2} alignItems="center">
                                    <Avatar name={option.name} size={'xs'} rounded={'lg'}></Avatar>

                                    <Text color={'gray.900'} fontWeight={'400'}>
                                        {option.name}
                                    </Text>
                                </Flex>
                            </Button>
                        ))}
                    </Flex>
                </PopoverBody>
            </PopoverContent>
        </PopoverRoot>
    );
};
