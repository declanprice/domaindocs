import { Injectable } from '@nestjs/common';
import { AuthenticatedUser, SelectableOrganisation } from 'shared-lib';
import { CreateOrganisationDto } from './dto/create-organisation.dto';
import { v4 } from 'uuid';
import { eq } from 'drizzle-orm';
import { PrismaService } from '../global';

@Injectable()
export class OrganisationsService {
  constructor(private readonly prisma: PrismaService) {}

  async getSelectable(
    user: AuthenticatedUser,
  ): Promise<SelectableOrganisation[]> {
    return this.prisma.organisations.findMany({
      where: { people: { some: { username: user.username } } },
      include: {
        domains: true,
      },
    });
  }

  async createOrganisation(
    user: AuthenticatedUser,
    dto: CreateOrganisationDto,
  ) {
    return this.prisma.$transaction(async (tx) => {
      const orgId = v4();

      await tx.organisations.create({
        data: {
          id: orgId,
          name: dto.name,
          summary: '',
          people: {
            create: {
              username: user.username,
              contactNumber: '',
              contactEmail: '',
              contactLocation: '',
            },
          },
        },
      });
    });
  }
}
