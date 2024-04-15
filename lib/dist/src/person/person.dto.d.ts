export declare class PersonTeamDto {
    private teamId;
    private teamName;
    private subdomainName;
    constructor(teamId: string, teamName: string, subdomainName: string);
}
export declare class PersonSkillDto {
    private skillId;
    private skillName;
    private skillDescription;
    constructor(skillId: string, skillName: string, skillDescription: string);
}
export declare class PersonDto {
    private personId;
    private userId;
    private firstName;
    private lastName;
    private contact;
    private iconUri;
    private roleName;
    constructor(personId: string, userId: string, firstName: string, lastName: string, contact: {
        personalContactMobile?: string;
        personalContactEmail?: string;
        contactEmail?: string;
        contactMobile?: string;
    }, iconUri: string | undefined, roleName: string | undefined);
}
export declare class DetailedPersonDto {
    private person;
    private skills;
    private team;
    constructor(person: PersonDto, skills: PersonSkillDto[], team: PersonTeamDto | null);
}
