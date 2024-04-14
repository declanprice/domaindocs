export class PersonSubdomainDto {
  constructor(
    private subdomainId: string,
    private subdomainName: string,
  ) {}
}

export class PersonTeamDto {
  constructor(
    private teamId: string,
    private teamName: string,
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
    private subdomains: PersonSubdomainDto[],
    private teams: PersonTeamDto[],
  ) {}
}
