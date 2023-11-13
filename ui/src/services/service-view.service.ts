import { createSignal } from 'solid-js'

export type ServiceView = {
    id: string
    name: string
    summary: string
    ownedBy: {
        name: string
        teamId: string
    }[]
    dependencies: {
        name: string
        domainId: string
        subDomainId: string
        serviceId: string
        direction: 'uses' | 'usedBy'
    }[]
    techStack: {
        name: string
    }[]
}

export const [serviceView, setServiceView] = createSignal<ServiceView | null>(
    null
)

export const fetchServiceView = (serviceId: string) => {
    setServiceView(() => views[serviceId])
}

const views: { [key: string]: ServiceView } = {
    '1': {
        id: '1',
        name: 'Customer API',
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
        dependencies: [
            {
                serviceId: '1',
                domainId: '1',
                subDomainId: '1',
                name: 'Customer API',
                direction: 'uses'
            },
            {
                serviceId: '2',
                domainId: '1',
                subDomainId: '1',
                name: 'Customer UI',
                direction: 'usedBy'
            }
        ],
        techStack: [{ name: 'React' }, { name: 'NodeJS' }]
    },
    '2': {
        id: '2',
        name: 'Customer UI',
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
        dependencies: [
            {
                serviceId: '1',
                domainId: '1',
                subDomainId: '1',
                name: 'Customer API',
                direction: 'uses'
            },
            {
                serviceId: '2',
                domainId: '1',
                subDomainId: '1',
                name: 'Customer UI',
                direction: 'usedBy'
            }
        ],
        techStack: [{ name: 'React' }, { name: 'NodeJS' }]
    }
}
