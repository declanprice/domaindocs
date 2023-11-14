import { Elysia } from 'elysia'

import { userService } from '../services/user.service'
import { domainsService } from '../services/domains.service'

export const setup = new Elysia({ name: 'setup' })
    .decorate('userService', userService)
    .decorate('domainService', domainsService)
