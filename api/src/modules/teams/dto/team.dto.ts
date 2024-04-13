class TeamSubdomainDto {
  constructor(
    private readonly subdomainId: string,
    private readonly subdomainName: string,
  ) {}
}

class TeamPersonDto {
  constructor(
    private readonly personId: string,
    private readonly firstName: string,
    private readonly lastName: string,
    private readonly iconUri?: string,
  ) {}
}

class TeamProjectDto {
  constructor(
    private projectId: string,
    private projectName: string,
  ) {}
}

export class TeamDto {
  constructor(
    private readonly teamId: string,
    private name: string,
    private subdomains: TeamSubdomainDto[],
    private people: TeamPersonDto[],
    private projects: TeamProjectDto[],
  ) {}
}
