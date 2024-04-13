type UserDomain = {
  domainId: string;
  name: string;
};

export class UserDto {
  constructor(
    private userId: string,
    private email: string,
    private firstName: string,
    private lastName: string,
    private domains: UserDomain[],
  ) {}
}
