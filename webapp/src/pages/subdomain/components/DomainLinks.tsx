import { Link, EditLinkData } from '@domaindocs/types';
import { useMutation } from '@tanstack/react-query';
import { Links } from '../../../components/links/Links';
import { domainsApi } from '../../../state/api/domains-api';

type DomainLinksProps = {
    domainId: string;
    links: Link[];
};

export const DomainLinks = (props: DomainLinksProps) => {
    const { domainId, links } = props;

    const { mutateAsync: addLink } = useMutation({
        mutationFn: async (data: EditLinkData) => {
            return domainsApi.addLink(domainId, data);
        },
    });

    const { mutateAsync: updateLink } = useMutation({
        mutationFn: async (data: EditLinkData) => {
            return domainsApi.updateLink(domainId, data.linkId!, data);
        },
    });

    const { mutateAsync: removeLink } = useMutation({
        mutationFn: async (link: Link) => {
            return domainsApi.removeLink(domainId, link.linkId);
        },
    });

    return <Links onAddLink={addLink} onUpdateLink={updateLink} onRemoveLink={removeLink} links={links} />;
};
