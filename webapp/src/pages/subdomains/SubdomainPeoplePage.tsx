import { Flex, Stack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { SubdomainPageParams } from './types/SubdomainPageParams';
import { DetailedPerson, peopleApi } from '../../state/api/people-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { TableToolbar } from '../../components/table/TableToolbar';
import { PersonTable } from '../../components/person/PersonTable';

export const SubdomainPeoplePage = () => {
  const { domainId, subdomainId } = useParams() as SubdomainPageParams;

  const { data: people, isLoading } = useQuery<DetailedPerson[]>({
    queryKey: ['subdomainPeople', { domainId, subdomainId }],
    queryFn: () => peopleApi.searchPeople(domainId, { subdomainId }),
  });

  if (!people || isLoading) return <LoadingContainer />;

  return (
    <Flex p={4} gap={4} width={'100%'} direction={'column'}>
      <Stack>
        <TableToolbar
          title={'Supporting People (3)'}
          onSearch={() => {}}
          onFilterClick={() => {}}
        />

        <PersonTable people={people} onPersonClick={() => {}} />
      </Stack>
    </Flex>
  );
};
