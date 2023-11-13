import { createEffect, createSignal } from 'solid-js'
import { authUser } from './auth.service.ts'

export type SelectableDomain = {
    id: string
    name: string
}

export const [selectedDomain, setSelectedDomain] =
    createSignal<SelectableDomain | null>(null)

export const [selectableDomains, setSelectableDomains] = createSignal<
    SelectableDomain[]
>([])

export const fetchSelectableDomains = () => {
    const domains = [
        { id: '1', name: 'My Domain' },
        { id: '2', name: 'Another Domain' }
    ]

    setSelectedDomain(() => domains[0])
    setSelectableDomains(() => domains)
}

createEffect(() => {
    if (authUser() === null) return

    fetchSelectableDomains()
})
