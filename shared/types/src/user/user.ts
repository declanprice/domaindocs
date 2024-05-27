export class UserDomain {
    constructor(
        public domainId: string,
        public name: string,
    ) {}
}

export class User {
    constructor(
        public userId: string,
        public email: string,
        public firstName: string,
        public lastName: string,
        public domains: UserDomain[],
    ) {}
}
