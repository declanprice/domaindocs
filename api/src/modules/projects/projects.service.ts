import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(readonly prisma: PrismaService) {}
}
