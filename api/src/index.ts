import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'

import { usersRouter } from './routes/users/users.router'
import { domainRoutes } from './routes/domains/domain.routes'
import { viewsRoutes } from './routes/views/views.routers'

const app = new Elysia()
    .use(cors())
    .use(domainRoutes)
    .use(usersRouter)
    .use(viewsRoutes)
    .listen(3000)

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
