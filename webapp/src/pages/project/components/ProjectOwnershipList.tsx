import { isPersonOwnership, isTeamOwnership, ProjectOwnership as ProjectOwnershipData } from '@domaindocs/lib';
import { Flex, List, ListItem, Text } from '@chakra-ui/react';
import { AddIconButton } from '../../../components/buttons/AddIconButton';
import { PersonAvatar } from '../../../components/person/PersonAvatar';
import { TeamAvatar } from '../../../components/team/TeamAvatar';

type ProjectOwnershipProps = {
    domainId: string;
    projectId: string;
    projectName: string;
    ownership: ProjectOwnershipData[];
};

export const ProjectOwnershipList = (props: ProjectOwnershipProps) => {
    const { domainId, projectId, projectName, ownership } = props;

    return (
        <Flex direction={'column'} gap={1}>
            <Flex>
                <Text fontSize={16}>Ownership</Text>

                <AddIconButton marginLeft={'auto'} />
            </Flex>

            <List spacing={4}>
                {ownership.map((o) => {
                    if (isPersonOwnership(o)) {
                        return (
                            <ListItem>
                                <PersonAvatar {...o} />
                                <Text> {o.description} </Text>
                            </ListItem>
                        );
                    }

                    if (isTeamOwnership(o)) {
                        return (
                            <ListItem>
                                <TeamAvatar
                                    name={o.name}
                                    iconUri={o.iconUri}
                                    subTitle={o.description || 'Full Ownership'}
                                    small
                                />
                            </ListItem>
                        );
                    }
                })}
            </List>
        </Flex>
    );
};
