type AuthUserDomain = {
  domainId: string;
  name: string;
};

export class AuthUserDto {
  constructor(
    private userId: string,
    private email: string,
    private firstName: string,
    private lastName: string,
    private domains: AuthUserDomain[],
  ) {}
}