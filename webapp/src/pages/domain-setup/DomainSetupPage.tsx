import { Button, Flex, Heading, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { DefaultError, useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../../state/stores/auth.store';
import { domainsApi } from '../../state/api/domains-api';
import { FormTextInput } from '../../components/form/FormInput';
import { Domain, SetupDomainData } from '@domaindocs/types';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

export const DomainSetupPage = () => {
    const navigate = useNavigate();

    const setUserDomains = useAuthStore((state) => state.setUserDomains);

    const { mutate } = useMutation<Domain, DefaultError, SetupDomainData>({
        mutationKey: ['setupDomain'],
        mutationFn: domainsApi.setupDomain,
        onSuccess: (data) => {
            setUserDomains(data);
            navigate(`/${data.domainId}/home`);
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
        <Flex height={'100%'} width={'100%'} justifyContent={'center'} alignItems={'center'}>
            <form onSubmit={handleSubmit(submit)}>
                <Flex direction={'column'} alignItems={'end'} gap={6}>
                    <Heading size={'lg'}>Create Domain</Heading>
                    <FormTextInput name={'domainName'} control={control} placeholder={'Domain Name'} />
                    <Button type={'submit'} color={'white'} size={'xs'} backgroundColor={'gray.700'}>
                        Continue
                    </Button>

                    <Link href={'/auth/sign-in'} fontSize={12}>
                        Join an existing domain.
                    </Link>
                </Flex>
            </form>
        </Flex>
    );
};
