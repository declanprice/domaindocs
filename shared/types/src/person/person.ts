export class PersonTeam {
    constructor(
        public teamId: string,
        public teamName: string,
        public teamIconUri: string | undefined,
    ) {}
}

export class PersonSkill {
    constructor(
        public skillId: string,
        public skillName: string,
    ) {}
}

export class PersonRole {
    constructor(
        public roleId: string,
        public roleName: string,
        public isPrimary: boolean,
    ) {}
}

export enum PersonContactType {
    EMAIL = 'Email',
    MOBILE = 'Mobile',
    LINK = 'Link',
}

export class PersonContact {
    constructor(
        public linkId: string,
        public type: PersonContactType,
        public description: string,
        public href: string | null,
    ) {}
}

export class Person {
    constructor(
        public userId: string,
        public firstName: string,
        public lastName: string,
        public aboutMe: string,
        public dateJoined: string,
        public iconUri?: string,
    ) {}
}

export class DetailedPerson {
    constructor(
        public person: Person,
        public contacts: PersonContact[],
        public skills: PersonSkill[],
        public teams: PersonTeam[],
        public roles: PersonRole[],
    ) {}
}
