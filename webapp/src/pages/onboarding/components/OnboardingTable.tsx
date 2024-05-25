import {
    Avatar,
    Badge,
    Box,
    Button,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Stack,
    Tag,
    TagLabel,
    Text,
    Tooltip,
} from '@chakra-ui/react';
import { Table } from '../../../components/table/Table';
import { DetailedOnboardingGuide, DetailedPerson } from '@domaindocs/types';
import { PersonAvatar } from '../../../components/person/PersonAvatar';
import { TeamAvatar } from '../../../components/team/TeamAvatar';

type OnboardingTableProps = {
    guides: DetailedOnboardingGuide[];
    onGuideClick: (guide: DetailedOnboardingGuide) => void;
};

export const OnboardingTable = (props: OnboardingTableProps) => {
    const { guides, onGuideClick } = props;

    return (
        <Table
            data={guides}
            fields={[
                {
                    label: 'Guide',
                    render: (data: DetailedOnboardingGuide) => <Text>{data.guide.name}</Text>,
                    onClick: (row) => {
                        onGuideClick(row);
                    },
                },
                {
                    label: 'Steps',
                    render: (data: DetailedOnboardingGuide) => {
                        return <Text>{data.steps.length} Steps </Text>;
                    },
                    onClick: (row) => {
                        console.log('clicked row', row);
                    },
                },
                {
                    label: 'Status',
                    render: (data: DetailedOnboardingGuide) => {
                        return <Text>{data.progress?.status || 'Not Started'}</Text>;
                    },
                    onClick: (row) => {
                        console.log('clicked row', row);
                    },
                },
            ]}
        />
    );
};
