import { Link, EditLinkData } from '@domaindocs/types';
import { useMutation } from '@tanstack/react-query';
import { Links } from '../../../components/links/Links';
import { subdomainsApi } from '../../../state/api/subdomains-api';
import { apiErrorToast } from '../../../util/toasts';

type SubdomainLinksProps = {
    domainId: string;
    subdomainId: string;
    links: Link[];
};

export const SubdomainLinks = (props: SubdomainLinksProps) => {
    const { domainId, subdomainId, links } = props;

    const { mutateAsync: addLink } = useMutation({
        mutationFn: async (data: EditLinkData) => {
            return subdomainsApi.addLink(domainId, subdomainId, data);
        },
        onError: apiErrorToast,
    });

    const { mutateAsync: updateLink } = useMutation({
        mutationFn: async (data: EditLinkData) => {
            return subdomainsApi.updateLink(domainId, subdomainId, data.linkId!, data);
        },
        onError: apiErrorToast,
    });

    const { mutateAsync: removeLink } = useMutation({
        mutationFn: async (link: Link) => {
            return subdomainsApi.removeLink(domainId, subdomainId, link.linkId);
        },
        onError: apiErrorToast,
    });

    return <Links onAddLink={addLink} onUpdateLink={updateLink} onRemoveLink={removeLink} links={links} />;
};
