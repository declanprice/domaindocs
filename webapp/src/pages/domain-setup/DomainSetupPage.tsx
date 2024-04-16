import { Button, Flex, Heading, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { object, string } from 'valibot';
import { DefaultError, useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../../state/stores/auth.store';
import {
  Domain,
  domainsApi,
  SetupDomainDto,
} from '../../state/api/domains-api';
import { FormTextInput } from '../../components/form/FormInput';

export const DomainSetupPage = () => {
  const navigate = useNavigate();

  const setUserDomains = useAuthStore((state) => state.setUserDomains);

  const { mutate } = useMutation<Domain, DefaultError, SetupDomainDto>({
    mutationKey: ['setupDomain'],
    mutationFn: domainsApi.setupDomain,
    onSuccess: (data) => {
      setUserDomains(data);
      navigate(`/${data.domainId}/home`);
    },
  });

  const { handleSubmit, control } = useForm<SetupDomainDto>({
    values: {
      domainName: '',
    },
    resolver: valibotResolver(
      object({
        domainName: string(),
      }),
    ),
  });

  const submit = (data: SetupDomainDto) => {
    return mutate(data);
  };

  return (
    <Flex
      height={'100%'}
      width={'100%'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <form onSubmit={handleSubmit(submit)}>
        <Flex direction={'column'} alignItems={'end'} gap={6}>
          <Heading size={'lg'}>Create Domain</Heading>
          <FormTextInput
            name={'domainName'}
            control={control}
            placeholder={'Domain Name'}
          />
          <Button
            type={'submit'}
            color={'white'}
            size={'xs'}
            backgroundColor={'gray.700'}
          >
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
