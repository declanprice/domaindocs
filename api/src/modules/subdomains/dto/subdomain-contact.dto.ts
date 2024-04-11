export class SubdomainContactDto {
  constructor(
    private userId: string,
    private firstName: string,
    private lastName: string,
    private role?: string,
    private avatarUri?: string,
  ) {}
}
