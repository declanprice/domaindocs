import { createSignal } from 'solid-js'

export type DomainView = {
    id: string
    name: string
    summary: string
    subDomains: {
        subDomainId: string
        name: string
        teamCount: number
        serviceCount: number
    }[]
}

export const [domainView, setDomainView] = createSignal<DomainView | null>(null)

export const fetchDomainView = (domainId: string) => {
    setDomainView(() => domainViews[domainId])
}

const domainViews: { [key: string]: DomainView } = {
    '1': {
        id: '1',
        name: 'My Domain Name',
        summary:
            'Track work across the enterprise through an open, collaborative platform. Link issues across Jira and ingest data from other software development tools, so your IT support and operations teams have richer contextual information to rapidly respond to requests, incidents, and changes.',
        subDomains: [
            {
                subDomainId: '1',
                name: 'Restaurant',
                teamCount: 5,
                serviceCount: 10
            },
            {
                subDomainId: '2',
                name: 'Customer',
                teamCount: 5,
                serviceCount: 10
            },
            {
                subDomainId: '3',
                name: 'Order',
                teamCount: 5,
                serviceCount: 10
            }
        ]
    },
    '2': {
        id: '2',
        name: 'My Other Domain',
        summary:
            'Track work across the enterprise through an open, collaborative platform. Link issues across Jira and ingest data from other software development tools, so your IT support and operations teams have richer contextual information to rapidly respond to requests, incidents, and changes.',
        subDomains: [
            {
                subDomainId: '1',
                name: 'Restaurant',
                teamCount: 5,
                serviceCount: 10
            },
            {
                subDomainId: '2',
                name: 'Order',
                teamCount: 5,
                serviceCount: 10
            }
        ]
    }
}
