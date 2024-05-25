export class UserDomainDto {
    constructor(
        public domainId: string,
        public name: string,
    ) {}
}

export class UserData {
    constructor(
        public userId: string,
        public email: string,
        public firstName: string,
        public lastName: string,
        public domains: UserDomainDto[],
    ) {}
}
