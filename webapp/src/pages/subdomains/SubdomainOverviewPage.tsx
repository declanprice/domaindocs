import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Flex, Heading, Text, useToast } from '@chakra-ui/react';
import { SubdomainPageParams } from './types/SubdomainPageParams';
import {
  SubdomainOverview,
  subdomainsApi,
} from '../../state/api/subdomains-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { SummaryCard } from '../../components/cards/summary/SummaryCard';
import { SubdomainContacts } from './components/SubdomainContacts';
import { SubdomainResourceLinks } from './components/SubdomainResourceLinks';

export const SubdomainOverviewPage = () => {
  const { domainId, subdomainId } = useParams() as SubdomainPageParams;

  const toast = useToast();

  const {
    data: overview,
    isLoading,
    refetch,
  } = useQuery<SubdomainOverview>({
    queryKey: ['subdomainOverview', { domainId, subdomainId }],
    queryFn: () => subdomainsApi.getOverviewById(domainId, subdomainId),
  });

  const { mutate: updateDescription } = useMutation({
    mutationKey: ['updateDescription'],
    mutationFn: async (description: string) => {
      await subdomainsApi.updateDescription(domainId, subdomainId, description);

      await refetch();

      toast({
        position: 'top',
        status: 'success',
        size: 'xs',
        colorScheme: 'gray',
        isClosable: true,
        duration: 3000,
        title: 'Description updated.',
      });
    },
  });

  if (!overview || isLoading) return <LoadingContainer />;

  return (
    <Flex p={4} gap={4} width={'100%'} direction={'column'}>
      <Heading width={'100%'} size={'md'} fontWeight={'regular'}>
        Welcome to the{' '}
        <Text display={'inline'} fontWeight={'bold'}>
          {overview.name}
        </Text>{' '}
        Subdomain
      </Heading>

      <SummaryCard
        peopleCount={overview.summary.peopleCount}
        teamCount={overview.summary.teamCount}
        projectCount={overview.summary.projectCount}
        description={overview.summary.description}
        onDescriptionChange={updateDescription}
      />

      <SubdomainContacts
        domainId={domainId}
        subdomainName={overview.name}
        subdomainId={subdomainId}
        subdomainContacts={overview.contacts}
        onAddContacts={async () => {
          await refetch();
        }}
      />

      <SubdomainResourceLinks
        domainId={domainId}
        subdomainName={overview.name}
        subdomainId={subdomainId}
        links={overview.resourceLinks}
        onAddLink={async () => {
          await refetch();
        }}
      />
    </Flex>
  );
};
