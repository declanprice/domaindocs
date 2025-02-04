import { EditLinkData, Link, TeamLink } from '@domaindocs/types';
import { useMutation } from '@tanstack/react-query';
import { teamsApi } from '../../../state/api/teams-api';
import { Links } from '../../../components/links/Links';

type TeamLinksProps = {
    domainId: string;
    teamId: string;
    links: TeamLink[];
};

export const ComponentLinks = (props: TeamLinksProps) => {
    const { domainId, teamId, links } = props;

    const { mutateAsync: addLink } = useMutation<void, any, EditLinkData>({
        mutationFn: (data) => teamsApi.createLink(domainId, teamId, data),
    });

    const { mutateAsync: updateLink } = useMutation<void, any, EditLinkData>({
        mutationFn: (data) => teamsApi.updateLink(domainId, teamId, data?.linkId!, data),
    });

    const { mutateAsync: removeLink } = useMutation({
        mutationFn: async (link: Link) => {
            return teamsApi.deleteLink(domainId, teamId, link.linkId);
        },
    });

    return <Links onAddLink={addLink} onUpdateLink={updateLink} onRemoveLink={removeLink} links={links} />;
};
