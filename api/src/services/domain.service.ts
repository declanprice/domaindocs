import { SelectableDomain } from 'shared-lib'

import { eq } from 'drizzle-orm'

import { db, domains, domainUsers } from '../schema'

export const domainService = (() => {
    const getSelectableDomains = async (
        userId: string
    ): Promise<SelectableDomain[]> => {
        const result = await db
            .select()
            .from(domains)
            .leftJoin(domainUsers, eq(domains.id, domainUsers.domainId))
            .where(eq(domainUsers.userId, userId))

        return result.map((r) => ({
            id: r.domains.id,
            name: r.domains.name
        }))
    }

    return {
        getSelectableDomains
    }
})()
