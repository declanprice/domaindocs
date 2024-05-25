import {
    Link,
    Popover,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverTrigger,
    Stack,
    Text,
} from '@chakra-ui/react';

import { Table } from '../../../components/table/Table';
import { DetailedWorkArea } from '@domaindocs/types';
import { PersonAvatar } from '../../../components/person/PersonAvatar';

type WorkAreasTableProps = {
    areas: DetailedWorkArea[];
    onAreaClick: (person: DetailedWorkArea) => void;
};

export const WorkAreasTable = (props: WorkAreasTableProps) => {
    const { areas, onAreaClick } = props;

    return (
        <Table
            data={areas}
            fields={[
                {
                    label: 'Area',
                    render: (data: DetailedWorkArea) => <Link>{data.area.name}</Link>,
                    onClick: (row) => {
                        onAreaClick(row);
                    },
                },
                {
                    label: 'People',
                    render: (data: DetailedWorkArea) => {
                        if (!data.people.length) {
                            return <Text>No People</Text>;
                        }

                        return (
                            <Popover>
                                <PopoverTrigger>
                                    <Text _hover={{ textDecoration: 'underline' }} cursor={'pointer'}>
                                        {data.people.length} People
                                    </Text>
                                </PopoverTrigger>
                                <PopoverContent backgroundColor={'lightgray'}>
                                    <PopoverCloseButton />
                                    <PopoverBody>
                                        <Stack spacing={2}>
                                            {data.people.map((m) => (
                                                <PersonAvatar
                                                    firstName={m.firstName}
                                                    lastName={m.lastName}
                                                    iconUri={m.iconUri}
                                                    small
                                                />
                                            ))}
                                        </Stack>
                                    </PopoverBody>
                                </PopoverContent>
                            </Popover>
                        );
                    },
                    onClick: (row) => {
                        console.log('clicked row', row);
                    },
                },
            ]}
        />
    );
};
