import { Elysia } from 'elysia'

import { setup } from '../setup'

export const usersRouter = new Elysia({ prefix: '/users' })
    .use(setup)
    .get('/', async ({ userService }) => {
        return userService.getAll()
    })
