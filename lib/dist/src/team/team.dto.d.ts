export declare class TeamSubdomainDto {
    private readonly subdomainId;
    private readonly subdomainName;
    constructor(subdomainId: string, subdomainName: string);
}
export declare class TeamMemberDto {
    private readonly personId;
    private readonly firstName;
    private readonly lastName;
    private readonly iconUri?;
    constructor(personId: string, firstName: string, lastName: string, iconUri?: string);
}
export declare class TeamProjectDto {
    private projectId;
    private projectName;
    constructor(projectId: string, projectName: string);
}
export declare class TeamDto {
    private readonly teamId;
    private name;
    private iconUri?;
    constructor(teamId: string, name: string, iconUri?: string);
}
export declare class TeamDetailedDto {
    private team;
    private subdomain;
    private members;
    private projects;
    constructor(team: TeamDto, subdomain: TeamSubdomainDto, members: TeamMemberDto[], projects: TeamProjectDto[]);
}
