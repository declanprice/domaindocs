export class PersonTeamDto {
    constructor(
        public teamId: string,
        public teamName: string,
    ) {}
}

export class PersonSkillDto {
    constructor(
        public skillId: string,
        public skillName: string,
        public skillDescription: string,
    ) {}
}

export class Person {
    constructor(
        public personId: string,
        public userId: string,
        public firstName: string,
        public lastName: string,
        public contact: {
            personalContactMobile?: string;
            personalContactEmail?: string;
            contactEmail?: string;
            contactMobile?: string;
        },
        public iconUri: string | undefined,
        public roleName: string | undefined,
    ) {}
}

export class DetailedPersonDto {
    constructor(
        public person: Person,
        public skills: PersonSkillDto[],
        public teams: PersonTeamDto[],
    ) {}
}
