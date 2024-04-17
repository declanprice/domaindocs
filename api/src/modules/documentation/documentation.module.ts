import { Module } from '@nestjs/common';
import { DocumentationController } from './documentation.controller';
import { DocumentationService } from './documentation.service';
import { PrismaService } from '../../shared/services/prisma.service';

@Module({
  controllers: [DocumentationController],
  providers: [PrismaService, DocumentationService],
})
export class DocumentationModule {}
