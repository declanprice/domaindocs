import { Module } from '@nestjs/common';
import { DocumentationController } from './documentation.controller';
import { DocumentationService } from './documentation.service';
import { PrismaService } from '../../shared/prisma.service';

@Module({
    controllers: [DocumentationController],
    providers: [DocumentationService, PrismaService],
})
export class DocumentationModule {}
