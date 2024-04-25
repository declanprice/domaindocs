export class TeamMemberDto {
    constructor(
        public personId: string,
        public firstName: string,
        public lastName: string,
        public iconUri?: string,
    ) {}
}

export class TeamProjectDto {
    constructor(
        public projectId: string,
        public projectName: string,
    ) {}
}

export class TeamDto {
    constructor(
        public teamId: string,
        public name: string,
        public iconUri?: string,
    ) {}
}

export class DetailedTeamDto {
    constructor(
        public team: TeamDto,
        public members: TeamMemberDto[],
        public projects: TeamProjectDto[],
    ) {}
}
