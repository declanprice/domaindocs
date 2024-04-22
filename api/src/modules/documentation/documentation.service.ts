import { Inject, Injectable } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import { Documentation, DocumentationType } from '@domaindocs/lib';
import { AddDocumentation } from '../../../../lib/src/documentation/add-documentation';
import { v4 } from 'uuid';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '@domaindocs/database';
import { documentation } from '@domaindocs/database';
import { eq, isNotNull } from 'drizzle-orm';

@Injectable()
export class DocumentationService {
  constructor(@Inject('DB') private db: PostgresJsDatabase<typeof schema>) {}

  async search(session: UserSession, domainId: string) {
    const result = await this.db.query.documentation.findMany({
      where: isNotNull(documentation.projectId),
      with: {
        project: true,
        children: {
          with: {
            children: true,
          },
        },
      },
    });

    return result.map(
      (d) =>
        new Documentation(
          d.documentationId,
          d.project.name,
          d.type as DocumentationType,
          d.children.map(
            (d1) =>
              new Documentation(
                d1.documentationId,
                d1.name,
                d1.type as DocumentationType,
                d1.children.map(
                  (d2) =>
                    new Documentation(
                      d2.documentationId,
                      d2.name,
                      d2.type as DocumentationType,
                      null,
                    ),
                ),
              ),
          ),
        ),
    );
  }

  async add(
    session: UserSession,
    domainId: string,
    documentationId: string,
    dto: AddDocumentation,
  ) {
    await this.db.insert(documentation).values({
      documentationId: v4(),
      domainId,
      name: `New ${dto.type}`,
      parentId: documentationId,
      type: dto.type,
    });
  }

  async remove(
    session: UserSession,
    domainId: string,
    documentationId: string,
  ) {
    await this.db
      .delete(documentation)
      .where(eq(documentation.documentationId, documentationId));
  }
}
