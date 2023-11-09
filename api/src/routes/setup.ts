import {Elysia} from "elysia";

import userService from "../services/user.service";

export const setup = new Elysia({name: 'setup'}).decorate('userService', userService);