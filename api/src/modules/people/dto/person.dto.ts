export class PersonDto {
  constructor(
    private userId: string,
    private firstName: string,
    private lastName: string,
    private iconUri?: string,
    private roleName?: string,
  ) {}
}
