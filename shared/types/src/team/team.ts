export class TeamMember {
    constructor(
        public userId: string,
        public firstName: string,
        public lastName: string,
        public iconUri?: string,
        public roles?: { roleId: string; roleName: string }[],
    ) {}
}

export enum TeamContactType {
    EMAIL = 'Email',
    MOBILE = 'Mobile',
    LINK = 'Link',
}

export class TeamContact {
    constructor(
        public contactId: string,
        public type: TeamContactType,
        public description: string,
        public href?: string,
    ) {}
}

export class TeamLink {
    constructor(
        public linkId: string,
        public href: string,
        public description: string,
    ) {}
}

export class TeamProject {
    constructor(
        public projectId: string,
        public projectName: string,
        public ownershipDescription?: string,
    ) {}
}

export class Team {
    constructor(
        public teamId: string,
        public name: string,
        public description: string,
        public dateFormed: string,
        public iconUri?: string,
    ) {}
}

export class DetailedTeam {
    constructor(
        public team: Team,
        public members: TeamMember[],
        public contacts: TeamContact[],
        public links: TeamLink[],
    ) {}
}
