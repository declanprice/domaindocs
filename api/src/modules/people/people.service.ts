import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma.service';
import { UserSession } from '../../auth/auth-session';
import { SearchPeopleDto } from './dto/search-people.dto';
import { PersonDto } from './dto/person.dto';

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
        user: true,
        role: true,
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
          person.role.name,
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
        subdomainPeople: {
          some: {
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
        user: true,
        role: true,
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
          person.role.name,
        ),
    );
  }
}
