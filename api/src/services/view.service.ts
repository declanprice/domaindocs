import { DomainView } from 'shared-lib'

import { eq } from 'drizzle-orm'

import { db, domains, subDomains } from '../schema'

export const viewService = (() => {
    const getDomainView = async (domainId: string): Promise<DomainView> => {
        const result = await db
            .select()
            .from(domains)
            .where(eq(domains.id, domainId))
            .leftJoin(subDomains, eq(subDomains.domainId, domains.id))

        const domain = result[0].domains

        return {
            id: domain.id,
            name: domain.name,
            summary: domain.summary,
            subDomains: result
                .filter((r) => r !== null)
                .map((r) => ({
                    subDomainId: r.sub_domains!.id,
                    name: r.sub_domains!.name,
                    teamCount: 0,
                    serviceCount: 0
                }))
        }
    }

    return {
        getDomainView
    }
})()
