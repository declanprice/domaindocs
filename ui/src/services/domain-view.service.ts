import { createSignal } from 'solid-js'

import { DomainView } from 'shared-lib'

import axiosInstance from './axios.instance.ts'

export const [domainView, setDomainView] = createSignal<DomainView | null>(null)

export const fetchDomainView = async (domainId: string) => {
    const result = await axiosInstance.get('/views/domain', {
        params: {
            domainId
        }
    })

    setDomainView(() => result.data)
}
