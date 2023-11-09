import {Elysia} from "elysia";

import userService from "../../services/user.service";

export const usersRouter = new Elysia({ prefix: '/users' })
    .get('/', async () => {

        const users = await userService.getAll();

        console.log('users', users);

        return new Response(JSON.stringify(users));
    })
