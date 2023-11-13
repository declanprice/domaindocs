import { createSignal } from 'solid-js'

export type SubDomainView = {
    id: string
    name: string
    summary: string
    ownedBy: {
        name: string
        teamId: string
    }[]
    services: {
        name: string
        serviceId: string
    }[]
}

export const [subDomainView, setSubDomainView] =
    createSignal<SubDomainView | null>(null)

export const fetchSubDomainView = (subDomainId: string) => {
    setSubDomainView(() => views[subDomainId])
}

const views: { [key: string]: SubDomainView } = {
    '1': {
        id: '1',
        name: 'Restaurant',
        summary:
            'Track work across the enterprise through an open, collaborative platform. Link issues across Jira and ingest data from other software development tools, so your IT support and operations teams have richer contextual information to rapidly respond to requests, incidents, and changes.',
        ownedBy: [
            {
                name: 'Team Orion',
                teamId: '1'
            },
            {
                name: 'Team Keplar',
                teamId: '2'
            }
        ],
        services: [
            {
                serviceId: '1',
                name: 'Customer API'
            },
            {
                serviceId: '2',
                name: 'Customer UI'
            }
        ]
    },
    '2': {
        id: '2',
        name: 'Customer',
        summary:
            'Track work across the enterprise through an open, collaborative platform. Link issues across Jira and ingest data from other software development tools, so your IT support and operations teams have richer contextual information to rapidly respond to requests, incidents, and changes.',
        ownedBy: [
            {
                name: 'Team Orion',
                teamId: '1'
            },
            {
                name: 'Team Keplar',
                teamId: '2'
            }
        ],
        services: [
            {
                serviceId: '1',
                name: 'Customer API'
            },
            {
                serviceId: '2',
                name: 'Customer UI'
            }
        ]
    },
    '3': {
        id: '3',
        name: 'Order',
        summary:
            'Track work across the enterprise through an open, collaborative platform. Link issues across Jira and ingest data from other software development tools, so your IT support and operations teams have richer contextual information to rapidly respond to requests, incidents, and changes.',
        ownedBy: [
            {
                name: 'Team Orion',
                teamId: '1'
            },
            {
                name: 'Team Keplar',
                teamId: '2'
            }
        ],
        services: [
            {
                serviceId: '1',
                name: 'Customer API'
            },
            {
                serviceId: '2',
                name: 'Customer UI'
            }
        ]
    }
}
