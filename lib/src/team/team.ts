export class TeamMember {
    constructor(
        public personId: string,
        public firstName: string,
        public lastName: string,
        public iconUri?: string,
    ) {}
}

export class TeamProject {
    constructor(
        public projectId: string,
        public projectName: string,
    ) {}
}

export class Team {
    constructor(
        public teamId: string,
        public name: string,
        public iconUri?: string,
    ) {}
}

export class DetailedTeam {
    constructor(
        public team: Team,
        public members: TeamMember[],
        public projects: TeamProject[],
    ) {}
}
