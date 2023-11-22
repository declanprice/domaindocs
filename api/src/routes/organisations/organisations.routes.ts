import { Elysia } from 'elysia'

import { getSelectableDomains } from '../../services/organisations.service'

export const organisationsRoutes = new Elysia({ prefix: '/organisations' }).get(
    '/selectable',
    async ({ query }) => {
        if (!query.accountId) {
            return new Response('userId query param required', { status: 400 })
        }

        return getSelectableDomains(query.accountId)
    }
)
