import { Module } from '@nestjs/common';
import { WorkAreasController } from './work-areas.controller';
import { WorkAreasService } from './work-areas.service';
import { PrismaService } from '../../shared/prisma.service';

@Module({
    controllers: [WorkAreasController],
    providers: [WorkAreasService, PrismaService],
})
export class WorkAreasModule {}
