import { useDisclosure } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { AddProjectLinkData, ProjectLink } from '@domaindocs/lib';

import { ProjectLinkCard } from '../../../components/project-link/ProjectLinkCard';
import { AddProjectLinkDialog } from '../../../components/project-link/AddProjectLinkDialog';
import { projectsApi } from '../../../state/api/projects-api';

type ProjectLinksCardProps = {
    projectName: string;
    projectId: string;
    domainId: string;
    links: ProjectLink[];
    onAddLink: (link: AddProjectLinkData) => Promise<void>;
};

export const ProjectLinks = (props: ProjectLinksCardProps) => {
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
        <>
            <ProjectLinkCard links={links} onAddLink={onDialogOpen} />

            <AddProjectLinkDialog
                title={`Pin a new link to ${projectName} project.`}
                isOpen={isDialogOpen}
                onClose={onDialogClose}
                onAddLink={addResourceLink}
            />
        </>
    );
};
