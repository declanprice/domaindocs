import { Box, Flex, Stack } from '@chakra-ui/react';
import { Outlet, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { SubdomainPageParams } from './SubdomainPageParams';
import { peopleApi } from '../../state/api/people-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { TableToolbar } from '../../components/table/TableToolbar';
import { PersonTable } from '../../components/person/PersonTable';
import { DetailedPersonDto } from '@domaindocs/lib';
import { SubdomainPageToolbar } from './SubdomainPageToolbar';

export const SubdomainPeoplePage = () => {
  const { domainId, subdomainId } = useParams() as SubdomainPageParams;

  const { data: people, isLoading } = useQuery<DetailedPersonDto[]>({
    queryKey: ['subdomainPeople', { domainId, subdomainId }],
    queryFn: () => peopleApi.searchPeople(domainId, { subdomainId }),
  });

  if (!people || isLoading) return <LoadingContainer />;

  return (
    <Flex direction="column" width={'100%'}>
      <SubdomainPageToolbar />

      <Box height={'100%'} width={'100%'} overflowY={'auto'}>
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
      </Box>
    </Flex>
  );
};