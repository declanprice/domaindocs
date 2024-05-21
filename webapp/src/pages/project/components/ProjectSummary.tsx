import { Flex, Text } from '@chakra-ui/react';

import { EditIconButton } from '../../../components/buttons/EditIconButton';

type ProjectSummaryProps = {
    domainId: string;
    projectId: string;
    description: string;
    onEdit: () => void;
};

export const ProjectSummary = (props: ProjectSummaryProps) => {
    const { description, onEdit } = props;

    return (
        <Flex direction={'column'} gap={1}>
            <Flex>
                <Text fontSize={16}>Summary</Text>

                <EditIconButton marginLeft={'auto'} onClick={onEdit} />
            </Flex>

            <Text>{description}</Text>
        </Flex>
    );
};
