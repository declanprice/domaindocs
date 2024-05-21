import { Flex, Text } from '@chakra-ui/react';
import { Team } from '@domaindocs/lib';
import { EditIconButton } from '../../../components/buttons/EditIconButton';

type TeamSummaryProps = {
    team: Team;
    onEdit: () => void;
};

export const TeamSummary = (props: TeamSummaryProps) => {
    const { team } = props;

    return (
        <Flex direction={'column'} gap={1}>
            <Flex>
                <Text fontSize={16}>Summary</Text>

                <EditIconButton marginLeft={'auto'} onClick={props.onEdit} />
            </Flex>

            <Text fontSize={12}>{team.description}</Text>
        </Flex>
    );
};
