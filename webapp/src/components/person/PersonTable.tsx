import { Badge } from '@chakra-ui/react';
import { Table } from '../table/Table';
import { DetailedPerson } from '@domaindocs/lib';

type PeopleTableProps = {
    people: DetailedPerson[];
    onPersonClick: (person: DetailedPerson) => void;
};

export const PersonTable = (props: PeopleTableProps) => {
    const { people, onPersonClick } = props;

    return (
        <Table
            data={people}
            fields={[
                {
                    label: 'Person',
                    render: (data: DetailedPerson) => `${data.person.firstName} ${data.person.lastName}`,
                    onClick: (row) => {
                        onPersonClick(row);
                    },
                },
                {
                    label: 'Teams',
                    render: (data: DetailedPerson) => {
                        if (data.teams.length) {
                            return data.teams.map((t) => t.teamName).join(' | ');
                        } else {
                            return (
                                <Badge size={'xs'} colorScheme={'yellow'}>
                                    Not Assigned
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
                    render: (data: DetailedPerson) => {
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
