import { db, users } from '../schema'

export const userService = (() => {
    const getAll = (): Promise<any> => {
        return db.select().from(users)
    }

    return {
        getAll
    }
})()
