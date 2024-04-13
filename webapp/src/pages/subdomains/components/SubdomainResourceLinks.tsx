import { useDisclosure } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'

import {
    AddResourceLinkData,
    SubdomainResourceLink,
    subdomainsApi,
} from '@state/api/subdomains-api.ts'
import { ResourceLinksCard } from '@components/cards/resource-links/ResourceLinksCard.tsx'
import { AddResourceLinkDialog } from '@components/dialogs/AddResourceLinkDialog.tsx'

type SubdomainResourceLinksProps = {
    subdomainName: string
    subdomainId: string
    domainId: string
    links: SubdomainResourceLink[]
    onAddLink: (link: AddResourceLinkData) => Promise<void>
}

export const SubdomainResourceLinks = (props: SubdomainResourceLinksProps) => {
    const { domainId, subdomainName, subdomainId, links, onAddLink } = props

    const {
        isOpen: isDialogOpen,
        onOpen: onDialogOpen,
        onClose: onDialogClose,
    } = useDisclosure()

    const { mutateAsync: addResourceLink } = useMutation({
        mutationKey: ['addResourceLink', { domainId, subdomainId }],
        mutationFn: async (link: AddResourceLinkData) => {
            await subdomainsApi.addResourceLink(domainId, subdomainId, link)
            await onAddLink(link)
        },
    })

    return (
        <>
            <ResourceLinksCard links={links} onAddLink={onDialogOpen} />

            <AddResourceLinkDialog
                title={`Pin a new resource to ${subdomainName} subdomain.`}
                isOpen={isDialogOpen}
                onClose={onDialogClose}
                onAddLink={addResourceLink}
            />
        </>
    )
}
