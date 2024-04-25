export class ProjectPersonOwnership {
    constructor(
        public personId: string,
        public firstName: string,
        public lastName: string,
        public description: string,
        public iconUri?: string,
    ) {}
}

export class ProjectTeamOwnership {
    constructor(
        public teamId: string,
        public name: string,
        public description: string,
        public iconUri?: string,
    ) {}
}

export type ProjectOwnership = (ProjectPersonOwnership | ProjectTeamOwnership)[];
