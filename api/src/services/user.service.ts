import {db, users} from "../schema";

export class UserService {
    async getAll(): Promise<any> {
        return db.select().from(users);
    }
}

export default new UserService();