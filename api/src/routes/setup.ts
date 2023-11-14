import { Elysia } from 'elysia'

import { userService } from '../services/user.service'
import { domainService } from '../services/domain.service'
import { viewService } from '../services/view.service'

export const setup = new Elysia({ name: 'setup' })
    .decorate('userService', userService)
    .decorate('domainService', domainService)
    .decorate('viewService', viewService)
