import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma.service';
import { UserSession } from '../../auth/auth-session';
import { SearchPeopleDto } from './dto/search-people.dto';
import { PersonDto, PersonTeamDto } from './dto/person.dto';

@Injectable()
export class PeopleService {
  constructor(readonly prisma: PrismaService) {}

  async searchPeople(
    session: UserSession,
    domainId: string,
    dto: SearchPeopleDto,
  ) {
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
        teams: {
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
        new PersonDto(
          person.personId,
          person.userId,
          person.user.firstName,
          person.user.lastName,
          person.user.iconUri,
          person.teams[0]?.role,
          [],
          person.teams.map(
            (t) =>
              new PersonTeamDto(t.teamId, t.team.name, t.team.subdomain.name),
          ),
        ),
    );
  }

  async searchPeopleBySubdomain(
    session: UserSession,
    domainId: string,
    dto: SearchPeopleDto,
  ) {
    const result = await this.prisma.person.findMany({
      where: {
        domainId,
        teams: {
          some: {
            team: {
              subdomainId: dto.subdomainId,
            },
          },
        },
        user: {
          fullName: {
            contains: dto.name,
          },
        },
      },
      include: {
        teams: {
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
        new PersonDto(
          person.personId,
          person.userId,
          person.user.firstName,
          person.user.lastName,
          person.user.iconUri,
          person.teams[0]?.role,
          [],
          person.teams.map(
            (t) =>
              new PersonTeamDto(t.teamId, t.team.name, t.team.subdomain.name),
          ),
        ),
    );
  }
}
