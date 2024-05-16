import { Flex, List, ListItem, Stack, Text } from '@chakra-ui/react';
import { AddIconButton } from '../../../components/buttons/AddIconButton';
import { TeamProject } from '@domaindocs/lib';

type TeamProjectsListProps = {
    projects: TeamProject[];
};

export const TeamProjectsList = (props: TeamProjectsListProps) => {
    const { projects } = props;

    return (
        <Flex direction={'column'} py={2} gap={1}>
            <Flex>
                <Text fontSize={16}>Projects</Text>

                <AddIconButton marginLeft={'auto'} />
            </Flex>

            <List spacing={2}>
                {projects.map((project: TeamProject) => (
                    <ListItem>
                        <Stack spacing={0}>
                            <Text fontSize={14}>{project.projectName}</Text>
                            <Text fontSize={12}>{project.ownershipDescription || 'Full Ownership'}</Text>
                        </Stack>
                    </ListItem>
                ))}
            </List>
        </Flex>
    );
};
