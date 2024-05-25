import {
    Avatar,
    Box,
    Flex,
    IconButton,
    Link,
    List,
    ListItem,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    SimpleGrid,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { ProjectLink } from '@domaindocs/types';

import { AddIconButton } from '../../../components/buttons/AddIconButton';
import { TbDots } from 'react-icons/tb';
import { useHover } from '@uidotdev/usehooks';
import { AddProjectLinkDialog } from './AddProjectLinkDialog';
import React from 'react';
import { DefaultError, useMutation } from '@tanstack/react-query';
import { projectsApi } from '../../../state/api/projects-api';

type ProjectLinksCardProps = {
    domainId: string;
    projectId: string;
    links: ProjectLink[];
    onAddLink: () => void;
    onRemoveLink: () => void;
};

export const ProjectLinksList = (props: ProjectLinksCardProps) => {
    const { domainId, projectId, links, onAddLink, onRemoveLink } = props;

    const addProjectLink = useDisclosure();

    const removeLink = useMutation<void, DefaultError, string>({
        mutationKey: ['removeProjectLink', { domainId, projectId }],
        mutationFn: async (linkId: string) => {
            return projectsApi.removeLink(domainId, projectId, linkId);
        },
    });

    return (
        <Flex direction={'column'} gap={1}>
            <Flex>
                <Text fontSize={16}>Links</Text>

                <AddIconButton marginLeft={'auto'} onClick={addProjectLink.onOpen} />
            </Flex>

            <List>
                <SimpleGrid columns={3} spacing={5}>
                    {links.map((link) => (
                        <ProjectLinkItem
                            link={link}
                            onRemove={async () => {
                                await removeLink.mutateAsync(link.linkId);
                                onRemoveLink();
                            }}
                        />
                    ))}
                </SimpleGrid>
            </List>

            <AddProjectLinkDialog
                domainId={domainId}
                projectId={projectId}
                isOpen={addProjectLink.isOpen}
                onClose={addProjectLink.onClose}
                onSubmit={onAddLink}
            />
        </Flex>
    );
};

const ProjectLinkItem = (props: { link: ProjectLink; onRemove: (link: ProjectLink) => void }) => {
    const { link, onRemove } = props;

    const [ref, hovering] = useHover();

    return (
        <ListItem key={link.linkId} ref={ref}>
            <Flex alignItems="center" width={'100%'}>
                <Avatar
                    size={'xs'}
                    src={
                        link.iconUri ||
                        'https://static.vecteezy.com/system/resources/previews/002/387/755/non_2x/link-icon-free-vector.jpg'
                    }
                />

                <Box ml="3">
                    <Flex>
                        <Text fontWeight="regular" fontSize={14}>
                            {link.title}
                        </Text>
                    </Flex>

                    <Link isExternal href={link.href} fontSize={12}>
                        {link.subTitle}
                    </Link>
                </Box>

                {hovering && (
                    <Menu>
                        <MenuButton ml={'auto'} size={'xs'} as={IconButton} icon={<TbDots />} />

                        <MenuList>
                            <MenuItem onClick={() => onRemove(link)}>Remove</MenuItem>
                        </MenuList>
                    </Menu>
                )}
            </Flex>
        </ListItem>
    );
};
