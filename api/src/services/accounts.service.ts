import { db, accounts } from '../schema'

export const getAllAccounts = (): Promise<any> => {
    return db.select().from(accounts)
}
