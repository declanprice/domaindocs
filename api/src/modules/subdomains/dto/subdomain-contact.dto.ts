export class SubdomainContactDto {
  constructor(
    private userId: string,
    private firstName: string,
    private lastName: string,
    private roleName?: string,
    private avatarUri?: string,
  ) {}
}
