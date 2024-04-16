export class ProjectTechnologyDto {
  constructor(
    readonly technologyId: string,
    readonly name: string,
  ) {}
}

export class ProjectTeamDto {
  constructor(
    readonly teamId: string,
    readonly name: string,
  ) {}
}

export class ProjectSubdomainDto {
  constructor(
    readonly subdomainId: string,
    readonly name: string,
  ) {}
}

export class ProjectDto {
  constructor(
    readonly projectId: string,
    readonly name: string,
    readonly teamId: string,
  ) {}
}

export class DetailedProjectDto {
  constructor(
    readonly project: ProjectDto,
    readonly subdomain: ProjectSubdomainDto,
    readonly team: ProjectTeamDto,
    readonly technologies: ProjectTechnologyDto[],
  ) {}
}
