import axiosClient from './axiosClient.ts'

import { CreateOrganisation } from 'shared-lib'

export const createOrganisation = async (dto: CreateOrganisation): Promise<void> => {
    await axiosClient.post('/organisations', dto)
}
