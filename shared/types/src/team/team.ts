import { Contact } from '../contacts';
import { Link } from '../links';

export class TeamMember {
    constructor(
        public userId: string,
        public firstName: string,
        public lastName: string,
        public iconUri?: string,
        public roles?: { roleId: string; roleName: string }[],
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
        public contacts: Contact[],
        public links: Link[],
    ) {}
}
