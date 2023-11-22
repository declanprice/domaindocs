import { SelectableOrganisation } from 'shared-lib'

import { eq } from 'drizzle-orm'

import { db, organisations, people } from '../schema'

export const getSelectableDomains = async (
    accountId: string
): Promise<SelectableOrganisation[]> => {
    const result = await db
        .select()
        .from(organisations)
        .leftJoin(organisations, eq(organisations.id, people.organisationId))
        .where(eq(people.accountId, accountId))

    return []
    // return result.map((r) => ({
    //     id: r.organisations.id,
    //     name: r.organisations.name
    // }))
}
