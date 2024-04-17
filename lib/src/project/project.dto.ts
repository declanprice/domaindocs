export class ProjectTechnologyDto {
  constructor(
    public technologyId: string,
    public name: string,
  ) {}
}

export class ProjectTeamDto {
  constructor(
    public teamId: string,
    public name: string,
  ) {}
}

export class ProjectSubdomainDto {
  constructor(
    public subdomainId: string,
    public name: string,
  ) {}
}

export class ProjectDto {
  constructor(
    public projectId: string,
    public name: string,
    public teamId: string,
  ) {}
}

export class DetailedProjectDto {
  constructor(
    public project: ProjectDto,
    public subdomain: ProjectSubdomainDto,
    public team: ProjectTeamDto,
    public technologies: ProjectTechnologyDto[],
  ) {}
}
