export class PersonTeamDto {
  constructor(
    private teamId: string,
    private teamName: string,
    private subdomainName: string,
  ) {}
}

export class PersonSkillDto {
  constructor(
    private skillId: string,
    private skillName: string,
    private skillDescription: string,
  ) {}
}

export class PersonDto {
  constructor(
    private personId: string,
    private userId: string,
    private firstName: string,
    private lastName: string,
    private iconUri: string | undefined,
    private roleName: string | undefined,
  ) {}
}

export class DetailedPersonDto {
  constructor(
    private person: PersonDto,
    private skills: PersonSkillDto[],
    private team: PersonTeamDto | null,
  ) {}
}
