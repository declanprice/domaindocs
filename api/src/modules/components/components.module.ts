import { Module } from '@nestjs/common';
import { ComponentsController } from './components.controller';
import { ComponentsService } from './components.service';
import { PrismaService } from '../../shared/prisma.service';

@Module({
    controllers: [ComponentsController],
    providers: [ComponentsService, PrismaService],
})
export class ComponentsModule {}
