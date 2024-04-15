export class TeamSubdomainDto {
  constructor(
    private readonly subdomainId: string,
    private readonly subdomainName: string,
  ) {}
}

export class TeamMemberDto {
  constructor(
    private readonly personId: string,
    private readonly firstName: string,
    private readonly lastName: string,
    private readonly iconUri?: string,
  ) {}
}

export class TeamProjectDto {
  constructor(
    private projectId: string,
    private projectName: string,
  ) {}
}

export class TeamDto {
  constructor(
    private readonly teamId: string,
    private name: string,
    private iconUri?: string,
  ) {}
}

export class TeamDetailedDto {
  constructor(
    private team: TeamDto,
    private subdomain: TeamSubdomainDto,
    private members: TeamMemberDto[],
    private projects: TeamProjectDto[],
  ) {}
}
