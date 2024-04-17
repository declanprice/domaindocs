import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { SubdomainPageParams } from './SubdomainPageParams';
import { subdomainsApi } from '../../state/api/subdomains-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { SubdomainContacts } from './components/SubdomainContacts';
import { SubdomainResourceLinks } from './components/SubdomainResourceLinks';
import { SubdomainOverviewDto } from '@domaindocs/lib';
import { SubdomainPageToolbar } from './SubdomainPageToolbar';
import { SubdomainSummary } from './components/SubdomainSummary';

export const SubdomainOverviewPage = () => {
  const { domainId, subdomainId } = useParams() as SubdomainPageParams;

  const {
    data: overview,
    isLoading,
    refetch,
  } = useQuery<SubdomainOverviewDto>({
    queryKey: ['subdomainOverview', { domainId, subdomainId }],
    queryFn: () => subdomainsApi.getOverviewById(domainId, subdomainId),
  });

  if (!overview || isLoading) return <LoadingContainer />;

  return (
    <Flex direction="column" width={'100%'}>
      <SubdomainPageToolbar />

      <Box height={'100%'} width={'100%'} overflowY={'auto'}>
        <Flex p={4} gap={4} width={'100%'} direction={'column'}>
          <Heading width={'100%'} size={'md'} fontWeight={'regular'}>
            Welcome to the{' '}
            <Text display={'inline'} fontWeight={'bold'}>
              {overview.name}
            </Text>{' '}
            Subdomain
          </Heading>

          <SubdomainSummary
            domainId={domainId}
            subdomainId={subdomainId}
            peopleCount={overview.summary.peopleCount}
            teamCount={overview.summary.teamCount}
            projectCount={overview.summary.projectCount}
            description={overview.summary.description}
            onDescriptionChange={async () => {
              await refetch();
            }}
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
      </Box>
    </Flex>
  );
};
