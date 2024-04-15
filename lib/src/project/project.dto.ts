export class ProjectTechnologyDto {
    constructor(
        private technologyId: string,
        private name: string,
    ) {}
}

export class ProjectTeamDto {
    constructor(
        private teamId: string,
        private name: string,
    ) {}
}

export class ProjectSubdomainDto {
    constructor(
        private subdomainId: string,
        private name: string,
    ) {}
}

export class ProjectDto {
    constructor(
        private projectId: string,
        private name: string,
        private teamId: string,
    ) {}
}

export class DetailedProjectDto {
    constructor(
        private project: ProjectDto,
        private subdomain: ProjectSubdomainDto,
        private team: ProjectTeamDto,
        private technologies: ProjectTechnologyDto[],
    ) {}
}