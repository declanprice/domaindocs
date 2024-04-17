import { Badge } from '@chakra-ui/react';
import { Table } from '../table/Table';
import { DetailedPersonDto } from '@domaindocs/lib';

type PeopleTableProps = {
  people: DetailedPersonDto[];
  onPersonClick: (person: DetailedPersonDto) => void;
};

export const PersonTable = (props: PeopleTableProps) => {
  const { people, onPersonClick } = props;

  return (
    <Table
      data={people}
      fields={[
        {
          label: 'Person',
          render: (data: DetailedPersonDto) =>
            `${data.person.firstName} ${data.person.lastName}`,
          onClick: (row) => {
            onPersonClick(row);
          },
        },
        {
          label: 'Subdomain',
          render: (data: DetailedPersonDto) => {
            if (data.team) {
              return `${data.team.subdomainName}`;
            } else {
              return (
                <Badge size={'xs'} colorScheme={'yellow'}>
                  Not Set
                </Badge>
              );
            }
          },
          onClick: (row) => {
            console.log('clicked row', row);
          },
        },
        {
          label: 'Teams',
          render: (data: DetailedPersonDto) => {
            if (data.team) {
              return `${data.team.teamName}`;
            } else {
              return (
                <Badge size={'xs'} colorScheme={'yellow'}>
                  Not Set
                </Badge>
              );
            }
          },
          onClick: (row) => {
            console.log('clicked row', row);
          },
        },
        {
          label: 'Skills',
          render: (data: DetailedPersonDto) => {
            if (data.skills.length) {
              return `${data.skills.map((s) => s.skillName).join(' | ')}`;
            } else {
              return (
                <Badge size={'xs'} colorScheme={'gray'}>
                  Not Set
                </Badge>
              );
            }
          },
          onClick: (row) => {
            console.log('clicked row', row);
          },
        },
      ]}
    />
  );
};
