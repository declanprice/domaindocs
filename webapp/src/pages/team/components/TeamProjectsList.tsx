import { Flex, List, ListItem, Stack, Text } from '@chakra-ui/react';
import { AddIconButton } from '../../../components/buttons/AddIconButton';
import { TeamProject } from '@domaindocs/lib';
import { useNavigate } from 'react-router-dom';

type TeamProjectsListProps = {
    domainId: string;
    projects: TeamProject[];
};

export const TeamProjectsList = (props: TeamProjectsListProps) => {
    const { domainId, projects } = props;

    const navigate = useNavigate();

    return (
        <Flex direction={'column'} gap={1}>
            <Flex>
                <Text fontSize={16}>Projects</Text>
            </Flex>

            <List spacing={4}>
                {projects.map((project: TeamProject) => (
                    <ListItem
                        key={project.projectId}
                        onClick={() => {
                            navigate(`/${domainId}/projects/${project.projectId}`);
                        }}
                        _hover={{
                            cursor: 'pointer',
                        }}
                    >
                        <Stack spacing={1}>
                            <Text _hover={{ textDecoration: 'underline' }} fontSize={12}>
                                {project.projectName}
                            </Text>
                            <Text fontSize={10}>{project.ownershipDescription || 'Full Ownership'}</Text>
                        </Stack>
                    </ListItem>
                ))}
            </List>
        </Flex>
    );
};
