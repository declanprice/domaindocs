import { Module } from '@nestjs/common';
import { DomainController } from './domain.controller';
import { DomainService } from './domain.service';
import { PrismaService } from '../../shared/services/prisma.service';

@Module({
  controllers: [DomainController],
  providers: [PrismaService, DomainService],
})
export class DomainModule {}
