import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { PrismaService } from '../../shared/services/prisma.service';

@Module({
  controllers: [ProjectsController],
  providers: [PrismaService, ProjectsService],
})
export class ProjectsModule {}
