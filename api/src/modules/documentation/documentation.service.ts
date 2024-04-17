import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma.service';
import { UserSession } from '../../auth/auth-session';

@Injectable()
export class DocumentationService {
  constructor(readonly prisma: PrismaService) {}

  async search(session: UserSession) {}
}
