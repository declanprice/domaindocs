type UserDomain = {
    domainId: string;
    name: string;
};
export declare class UserDto {
    private userId;
    private email;
    private firstName;
    private lastName;
    private domains;
    constructor(userId: string, email: string, firstName: string, lastName: string, domains: UserDomain[]);
}
export {};
