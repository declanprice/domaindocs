export declare class ProjectTechnologyDto {
    private technologyId;
    private name;
    constructor(technologyId: string, name: string);
}
export declare class ProjectTeamDto {
    private teamId;
    private name;
    constructor(teamId: string, name: string);
}
export declare class ProjectSubdomainDto {
    private subdomainId;
    private name;
    constructor(subdomainId: string, name: string);
}
export declare class ProjectDto {
    private projectId;
    private name;
    private teamId;
    constructor(projectId: string, name: string, teamId: string);
}
export declare class DetailedProjectDto {
    private project;
    private subdomain;
    private team;
    private technologies;
    constructor(project: ProjectDto, subdomain: ProjectSubdomainDto, team: ProjectTeamDto, technologies: ProjectTechnologyDto[]);
}
