export class UserDomainDto {
  constructor(
    readonly domainId: string,
    readonly name: string,
  ) {}
}

export class UserDto {
  constructor(
    readonly userId: string,
    readonly email: string,
    readonly firstName: string,
    readonly lastName: string,
    readonly domains: UserDomainDto[],
  ) {}
}
