import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'

import { organisationsRoutes } from './routes/organisations/organisations.routes'
import { accountsRoutes } from './routes/accounts/accounts.routes'

const app = new Elysia()
    .use(cors())
    .use(organisationsRoutes)
    .use(accountsRoutes)
    .listen(3000)

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
