import { Flex, Stack, useDisclosure } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { peopleApi } from '../../state/api/people-api';
import { LoadingContainer } from '../../components/loading/LoadingContainer';
import { TableToolbar } from '../../components/table/TableToolbar';
import { PersonTable } from '../../components/person/PersonTable';
import { PersonSideBar } from '../../components/person/PersonSideBar';
import { DetailedPersonDto } from '@domaindocs/lib';

type PeoplePageParams = {
  domainId: string;
};

export const PeoplePage = () => {
  const { domainId } = useParams() as PeoplePageParams;

  const personSideBar = useDisclosure();

  const [selectedPerson, setSelectedPerson] =
    useState<DetailedPersonDto | null>(null);

  const { data: people, isLoading } = useQuery<DetailedPersonDto[]>({
    queryKey: ['searchPeople', { domainId }],
    queryFn: () => peopleApi.searchPeople(domainId, {}),
  });

  if (!people || isLoading) return <LoadingContainer />;

  return (
    <Flex p={4} gap={4} width={'100%'} direction={'column'}>
      <Stack>
        <TableToolbar
          title={'People (3)'}
          onSearch={() => {}}
          onFilterClick={() => {}}
        />

        <PersonTable
          people={people}
          onPersonClick={(person) => {
            setSelectedPerson(person);
            personSideBar.onOpen();
          }}
        />

        <PersonSideBar
          isOpen={personSideBar.isOpen}
          onClose={() => {
            setSelectedPerson(null);
            personSideBar.onClose();
          }}
          person={selectedPerson}
        />
      </Stack>
    </Flex>
  );
};
