import { useDisclosure } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { subdomainsApi } from '../../../state/api/subdomains-api';
import { ResourceLinksCard } from '../../../components/resource-link/ResourceLinksCard';
import { AddResourceLinkDialog } from '../../../components/resource-link/AddResourceLinkDialog';
import { AddSubdomainResourceLinkDto, ProjectLink, SubdomainResourceLinkDto } from '@domaindocs/lib';
import { projectsApi } from '../../../state/api/projects-api';
import { AddProjectLink } from '../../../../../lib/src/project/add-project-link';

type ProjectResourceLinksProps = {
    projectName: string;
    projectId: string;
    domainId: string;
    links: ProjectLink[];
    onAddLink: (link: AddProjectLink) => Promise<void>;
};

export const ProjectResourceLinksCard = (props: ProjectResourceLinksProps) => {
    const { domainId, projectId, projectName, links, onAddLink } = props;

    const { isOpen: isDialogOpen, onOpen: onDialogOpen, onClose: onDialogClose } = useDisclosure();

    const { mutateAsync: addResourceLink } = useMutation({
        mutationKey: ['addProjectResourceLink', { domainId, projectId }],
        mutationFn: async (link: AddProjectLink) => {
            await projectsApi.addResourceLink(domainId, projectId, link);
            await onAddLink(link);
        },
    });

    return (
        <>
            <ResourceLinksCard links={links} onAddLink={onDialogOpen} />

            <AddResourceLinkDialog
                title={`Pin a new resource to ${projectName} project.`}
                isOpen={isDialogOpen}
                onClose={onDialogClose}
                onAddLink={addResourceLink}
            />
        </>
    );
};
