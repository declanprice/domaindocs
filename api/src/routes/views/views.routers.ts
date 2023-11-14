import { Elysia } from 'elysia'

import { setup } from '../setup'

export const viewsRoutes = new Elysia({ prefix: '/views' })
    .use(setup)
    .get('/domain', async ({ viewService, query }) => {
        if (!query.domainId) {
            return new Response('domainId query param required', {
                status: 400
            })
        }

        return viewService.getDomainView(query.domainId)
    })
