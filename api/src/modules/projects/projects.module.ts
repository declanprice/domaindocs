import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { PrismaService } from '../../shared/prisma.service';

@Module({
    controllers: [ProjectsController],
    providers: [ProjectsService, PrismaService],
})
export class ProjectsModule {}
