import { Elysia } from 'elysia'

import { setup } from '../setup'

export const domainRoutes = new Elysia({ prefix: '/domains' })
    .use(setup)
    .get('/selectable', async ({ domainService, query }) => {
        if (!query.userId) {
            return new Response('userId quert param required', { status: 400 })
        }

        return domainService.getSelectableDomains(query.userId)
    })
