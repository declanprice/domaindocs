import { SelectableDomain } from 'shared-lib'

import { createSignal } from 'solid-js'
import axiosInstance from './axios.instance.ts'

export const [selectedDomain, setSelectedDomain] = createSignal<SelectableDomain | null>(null)

export const [selectableDomains, setSelectableDomains] = createSignal<SelectableDomain[]>([])

export const fetchSelectableDomains = async (userId: string) => {
    const response = await axiosInstance.get('domains/selectable', {
        params: {
            userId
        }
    })

    const domains: SelectableDomain[] = response.data

    if (domains.length) {
        setSelectedDomain(() => domains[0])
    }

    setSelectableDomains(() => domains)
}
