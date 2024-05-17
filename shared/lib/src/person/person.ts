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
        public skillDescription: string,
    ) {}
}

export class PersonRole {
    constructor(
        public roleId: string,
        public roleName: string,
        public roleDescription: string,
    ) {}
}

export class PersonContact {
    constructor(
        public personalMobile: string | null,
        public personalEmail: string | null,
        public workEmail: string | null,
        public workMobile: string | null,
    ) {}
}

export class Person {
    constructor(
        public userId: string,
        public firstName: string,
        public lastName: string,
        public iconUri: string | undefined,
        public primaryRoleName: string | undefined,
    ) {}
}

export class DetailedPerson {
    constructor(
        public person: Person,
        public contact: PersonContact | null,
        public skills: PersonSkill[],
        public teams: PersonTeam[],
        public roles: PersonRole[],
    ) {}
}
