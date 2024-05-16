import { Avatar, Box, Flex, Link, List, ListItem, SimpleGrid, Text, useDisclosure } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { AddProjectLinkData, ProjectLink } from '@domaindocs/lib';

import { projectsApi } from '../../../state/api/projects-api';
import { AddIconButton } from '../../../components/buttons/AddIconButton';

type ProjectLinksCardProps = {
    projectName: string;
    projectId: string;
    domainId: string;
    links: ProjectLink[];
    onAddLink: (link: AddProjectLinkData) => Promise<void>;
};

export const ProjectLinksList = (props: ProjectLinksCardProps) => {
    const { domainId, projectId, projectName, links, onAddLink } = props;

    const { isOpen: isDialogOpen, onOpen: onDialogOpen, onClose: onDialogClose } = useDisclosure();

    const { mutateAsync: addResourceLink } = useMutation({
        mutationKey: ['addProjectLink', { domainId, projectId }],
        mutationFn: async (link: AddProjectLinkData) => {
            await projectsApi.addLink(domainId, projectId, link);
            await onAddLink(link);
        },
    });

    return (
        <Flex direction={'column'} gap={1}>
            <Flex>
                <Text fontSize={16}>Ownership</Text>

                <AddIconButton marginLeft={'auto'} />
            </Flex>

            <List>
                <SimpleGrid columns={3} spacing={5}>
                    {links.map((link) => (
                        <ListItem>
                            <Flex alignItems="center" width={'100%'}>
                                <Avatar
                                    size={'xs'}
                                    src={
                                        link.iconUri ||
                                        'https://static.vecteezy.com/system/resources/previews/002/387/755/non_2x/link-icon-free-vector.jpg'
                                    }
                                />

                                <Box ml="3">
                                    <Text fontWeight="regular" fontSize={14}>
                                        {link.title}
                                    </Text>

                                    <Link isExternal href={link.href} fontSize={12}>
                                        {link.subTitle}
                                    </Link>
                                </Box>
                            </Flex>
                        </ListItem>
                    ))}
                </SimpleGrid>
            </List>
        </Flex>
    );
};
