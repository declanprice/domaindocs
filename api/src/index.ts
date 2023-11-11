import { Elysia } from 'elysia'

import { usersRouter } from './routes/users/users.router'

const app = new Elysia().use(usersRouter).listen(3000)

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
