export class UserDto {
  constructor(
    private userId: string,
    private firstName: string,
    private lastName: string,
    private roleName?: string,
    private iconUri?: string,
  ) {}
}
