import axiosClient from './axiosClient.ts'

import { CreateOrganisation, Organisation } from 'shared-lib'

export const createOrganisation = async (dto: CreateOrganisation): Promise<void> => {
    await axiosClient.post('/organisations', dto)
}

export const fetchOrganisation = async (organisationId: string): Promise<Organisation> => {
    const result = await axiosClient.get<Organisation>(`/organisations/${organisationId}`)
    return result.data
}
