import { Button, Flex, Heading } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { DefaultError, useMutation } from '@tanstack/react-query';
import { domainsApi } from '../../state/api/domains-api';
import { FormTextInput } from '../../components/form/FormTextInput';
import { Domain, SetupDomainData } from '@domaindocs/types';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

export const DomainSetupPage = () => {
    const { mutate } = useMutation<Domain, DefaultError, SetupDomainData>({
        mutationKey: ['setupDomain'],
        mutationFn: domainsApi.setupDomain,
        onSuccess: (data) => {
            window.location.href = '/';
        },
    });

    const { handleSubmit, control } = useForm<SetupDomainData>({
        values: {
            domainName: '',
        },
        resolver: classValidatorResolver(SetupDomainData),
    });

    const submit = (data: SetupDomainData) => {
        return mutate(data);
    };

    return (
        <Flex height={'100%'} width={'100%'} justifyContent={'center'} alignItems={'center'} gap={2}>
            <form onSubmit={handleSubmit(submit)}>
                <Flex direction={'column'} alignItems={'end'} gap={6}>
                    <Heading size={'lg'}>Create Domain</Heading>
                    <FormTextInput name={'domainName'} control={control} placeholder={'Domain Name'} />
                    <Button type={'submit'} color={'white'} size={'xs'} backgroundColor={'gray.700'}>
                        Continue
                    </Button>
                </Flex>
            </form>
        </Flex>
    );
};
