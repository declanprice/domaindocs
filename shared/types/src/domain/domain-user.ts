export class DomainUser {
    constructor(
        public userId: string,
        public email: string,
        public firstName: string,
        public lastName: string,
        public iconUri: string,
        public invitePending: boolean,
    ) {}
}
