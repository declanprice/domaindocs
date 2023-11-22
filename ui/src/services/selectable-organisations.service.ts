import { SelectableOrganisation } from 'shared-lib'

import { createSignal } from 'solid-js'

import axiosClient from './axiosClient.ts'

export const [selectedOrganisation, setSelectedOrganisation] = createSignal<SelectableOrganisation | null>(null)

export const [selectableOrganisations, setSelectableOrganisations] = createSignal<SelectableOrganisation[]>([])

export const fetchSelectableOrganisations = async (userId: string) => {
    const response = await axiosClient.get('organisations/selectable', {
        params: {
            userId
        }
    })

    const organisations: SelectableOrganisation[] = response.data

    if (organisations.length) {
        setSelectedOrganisation(() => organisations[0])
    }

    setSelectableOrganisations(() => organisations)
}
