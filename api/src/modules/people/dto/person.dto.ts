export class PersonTeamDto {
  constructor(
    private teamId: string,
    private teamName: string,
    private subdomainName: string,
  ) {}
}

export class PersonDto {
  constructor(
    private personId: string,
    private userId: string,
    private firstName: string,
    private lastName: string,
    private iconUri: string | undefined,
    private roleName: string | undefined,
    private skills: string[],
    private teams: PersonTeamDto[],
  ) {}
}
