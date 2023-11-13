import { createSignal } from 'solid-js'

export type Domain = {
    id: string
    name: string
}

export const domainsService = (() => {
    const [domains] = createSignal<Domain[] | null>([
        { id: '1', name: 'My Domain Name' },
        { id: '2', name: 'Another Domain Name' },
        { id: '3', name: 'Your Domain' }
    ])

    return {
        domains
    }
})()
