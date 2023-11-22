import { Elysia } from 'elysia'
import { getAllAccounts } from '../../services/accounts.service'

export const accountsRoutes = new Elysia({ prefix: '/accounts' }).get(
    '/',
    async () => {
        return getAllAccounts()
    }
)
