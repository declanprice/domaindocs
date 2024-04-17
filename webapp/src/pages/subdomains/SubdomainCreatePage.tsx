import { Button, Flex, Heading } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { object, string } from 'valibot';
import { DefaultError, useMutation } from '@tanstack/react-query';
import { FormTextInput } from '../../components/form/FormInput';
import { subdomainsApi } from '../../state/api/subdomains-api';
import { queryClient } from '../../state/query-client';
import { DomainPageParams } from '../../types/DomainPageParams';
import { CreateSubdomainDto, SubdomainDto } from '@domaindocs/lib';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

export const SubdomainCreatePage = () => {
  const { domainId } = useParams() as DomainPageParams;

  const navigate = useNavigate();

  const { mutate } = useMutation<
    SubdomainDto,
    DefaultError,
    CreateSubdomainDto
  >({
    mutationKey: ['createSubdomain'],
    mutationFn: (data) => subdomainsApi.createSubdomain(domainId, data),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ['domainSubdomains'],
      });

      navigate(`/${domainId}/sd/${data.subdomainId}/overview`);
    },
  });

  const { handleSubmit, control } = useForm<CreateSubdomainDto>({
    values: {
      subdomainName: '',
    },
    resolver: classValidatorResolver(CreateSubdomainDto),
  });

  const onSubmit = (data: CreateSubdomainDto) => {
    return mutate({
      subdomainName: data.subdomainName,
    });
  };

  return (
    <Flex
      height="100%"
      width="100%"
      justifyContent="center"
      alignItems="center"
    >
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
        })}
      >
        <Flex direction="column" textAlign="center" alignItems="center" gap={6}>
          <Heading size={'md'}>Add a new subdomain.</Heading>

          <FormTextInput
            name={'subdomainName'}
            control={control}
            placeholder={'subdomains name'}
          />

          <Button
            size={'xs'}
            width={'100%'}
            type={'submit'}
            color={'white'}
            backgroundColor={'gray.700'}
          >
            Add Subdomain
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};
