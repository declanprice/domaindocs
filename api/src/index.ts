import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'

import { usersRouter } from './routes/users/users.router'
import { domainRoutes } from './routes/domains/domain.routes'

const app = new Elysia()
    .use(cors())
    .use(domainRoutes)
    .use(usersRouter)
    .listen(3000)

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
