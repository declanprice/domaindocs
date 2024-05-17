export class ProjectPersonOwnership {
    constructor(
        public userId: string,
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

export const isPersonOwnership = (ownership: any): ownership is ProjectPersonOwnership => {
    return !!ownership.userId;
};

export const isTeamOwnership = (ownership: any): ownership is ProjectTeamOwnership => {
    return !!ownership.teamId;
};

export type ProjectOwnership = ProjectPersonOwnership | ProjectTeamOwnership;
