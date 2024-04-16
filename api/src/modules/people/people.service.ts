import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma.service';
import { UserSession } from '../../auth/auth-session';
import {
  DetailedPersonDto,
  PersonDto,
  PersonSkillDto,
  PersonTeamDto,
  SearchPeopleDto,
} from '@domaindocs/lib';

@Injectable()
export class PeopleService {
  constructor(readonly prisma: PrismaService) {}

  async searchPeople(
    session: UserSession,
    domainId: string,
    dto: SearchPeopleDto
  ): Promise<DetailedPersonDto[]> {
    const result = await this.prisma.person.findMany({
      where: {
        domainId,
        user: {
          fullName: {
            contains: dto.name,
          },
        },
      },
      include: {
        skills: {
          include: {
            skill: true,
          },
        },
        teamMember: {
          include: {
            team: {
              include: {
                subdomain: true,
              },
            },
          },
        },
        user: true,
      },
    });

    return result.map(
      (person) =>
        new DetailedPersonDto(
          new PersonDto(
            person.personId,
            person.userId,
            person.user.firstName,
            person.user.lastName,
            {
              personalContactEmail: person.personalContactEmail,
              personalContactMobile: person.personalContactEmail,
              contactMobile: person.contactMobile,
              contactEmail: person.contactEmail,
            },
            person.user.iconUri,
            person.teamMember?.role
          ),
          person.skills.map(
            (s) =>
              new PersonSkillDto(s.skillId, s.skill.name, s.skill.description)
          ),
          person.teamMember
            ? new PersonTeamDto(
                person.teamMember.teamId,
                person.teamMember.team.name,
                person.teamMember.team.subdomain.name
              )
            : null
        )
    );
  }

  async searchPeopleBySubdomain(
    session: UserSession,
    domainId: string,
    dto: SearchPeopleDto
  ): Promise<DetailedPersonDto[]> {
    const result = await this.prisma.person.findMany({
      where: {
        domainId,
        teamMember: {
          team: {
            subdomainId: dto.subdomainId,
          },
        },
        user: {
          fullName: {
            contains: dto.name,
          },
        },
      },
      include: {
        skills: {
          include: {
            skill: true,
          },
        },
        teamMember: {
          include: {
            team: {
              include: {
                subdomain: true,
              },
            },
          },
        },
        user: true,
      },
    });

    return result.map(
      (person) =>
        new DetailedPersonDto(
          new PersonDto(
            person.personId,
            person.userId,
            person.user.firstName,
            person.user.lastName,
            {
              personalContactEmail: person.personalContactEmail,
              personalContactMobile: person.personalContactEmail,
              contactMobile: person.contactMobile,
              contactEmail: person.contactEmail,
            },
            person.user.iconUri,
            person.teamMember?.role
          ),
          person.skills.map(
            (s) =>
              new PersonSkillDto(s.skillId, s.skill.name, s.skill.description)
          ),
          person.teamMember
            ? new PersonTeamDto(
                person.teamMember.teamId,
                person.teamMember.team.name,
                person.teamMember.team.subdomain.name
              )
            : null
        )
    );
  }
}
