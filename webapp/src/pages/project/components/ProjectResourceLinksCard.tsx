import { useDisclosure } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { subdomainsApi } from '../../../state/api/subdomains-api';
import { ResourceLinksCard } from '../../../components/resource-link/ResourceLinksCard';
import { AddResourceLinkDialog } from '../../../components/resource-link/AddResourceLinkDialog';
import { AddSubdomainResourceLinkDto, ProjectResourceLink, SubdomainResourceLinkDto } from '@domaindocs/lib';
import { projectsApi } from '../../../state/api/projects-api';
import { AddProjectResourceLink } from '../../../../../lib/src/project/add-project-resource-link';

type ProjectResourceLinksProps = {
    projectName: string;
    projectId: string;
    domainId: string;
    links: ProjectResourceLink[];
    onAddLink: (link: AddProjectResourceLink) => Promise<void>;
};

export const ProjectResourceLinksCard = (props: ProjectResourceLinksProps) => {
    const { domainId, projectId, projectName, links, onAddLink } = props;

    const { isOpen: isDialogOpen, onOpen: onDialogOpen, onClose: onDialogClose } = useDisclosure();

    const { mutateAsync: addResourceLink } = useMutation({
        mutationKey: ['addProjectResourceLink', { domainId, projectId }],
        mutationFn: async (link: AddProjectResourceLink) => {
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
