import { Text, Card, CardBody, CardHeader, Flex, Avatar, Box } from '@chakra-ui/react';
import { isPersonOwnership, isTeamOwnership, ProjectOwnership } from '@domaindocs/lib';

type ProjectOwnershipCardProps = {
    ownership: ProjectOwnership[];
};

export const ProjectOwnershipCard = (props: ProjectOwnershipCardProps) => {
    const { ownership } = props;

    return (
        <Card boxShadow="xs">
            <CardHeader pb={0} fontSize={16}>
                <Flex>
                    <Text flex={1}>Ownership</Text>
                </Flex>
            </CardHeader>
            <CardBody>
                {ownership.map((o) => {
                    if (isPersonOwnership(o)) {
                        return (
                            <Flex alignItems="center" width={'100%'}>
                                <Avatar size={'xs'} src={o.iconUri} name={`${o.firstName} ${o.lastName}`} />

                                <Box ml="3">
                                    <Text fontWeight="regular" fontSize={14}>
                                        {o.firstName} ${o.lastName}
                                    </Text>

                                    <Text fontWeight="regular" fontSize={12}>
                                        {o.description}
                                    </Text>
                                </Box>
                            </Flex>
                        );
                    }

                    if (isTeamOwnership(o)) {
                        return (
                            <Flex alignItems="center" width={'100%'}>
                                <Avatar size={'xs'} src={o.iconUri} name={`${o.name}`} />

                                <Box ml="3">
                                    <Text fontWeight="regular" fontSize={14}>
                                        {o.name}
                                    </Text>

                                    <Text fontWeight="regular" fontSize={12}>
                                        {o.description}
                                    </Text>
                                </Box>
                            </Flex>
                        );
                    }
                })}
            </CardBody>
        </Card>
    );
};
