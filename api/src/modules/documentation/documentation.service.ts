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

  async search(session: UserSession) {
    const result = await this.prisma.projectDocumentation.findMany({
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
