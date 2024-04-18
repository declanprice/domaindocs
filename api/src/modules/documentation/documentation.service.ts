import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma.service';
import { UserSession } from '../../auth/auth-session';
import {
  Documentation,
  DocumentationType,
  ProjectDocumentation,
} from '@domaindocs/lib';

@Injectable()
export class DocumentationService {
  constructor(readonly prisma: PrismaService) {}

  async search(session: UserSession, domainId: string) {
    const result = await this.prisma.projectDocumentation.findMany({
      where: {
        project: {
          domain: {
            domainId,
          },
        },
      },
      include: {
        project: true,
      },
    });

    return result.map(
      (documentation) =>
        new ProjectDocumentation(
          documentation.projectId,
          documentation.project.name,
          JSON.parse(documentation.documentation as any),
        ),
    );
  }

  async getRelevantToMe(session: UserSession) {
    const result = await this.prisma.projectDocumentation.findMany({
      where: {
        project: {
          team: {
            members: {
              some: {
                person: {
                  userId: session.userId,
                },
              },
            },
          },
        },
      },
      include: {
        project: true,
      },
    });

    return result.map(
      (documentation) =>
        new ProjectDocumentation(
          documentation.projectId,
          documentation.project.name,
          JSON.parse(documentation.documentation as any),
        ),
    );
  }
}
