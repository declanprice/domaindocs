import { Module } from '@nestjs/common';
import { SubdomainsController } from './subdomains.controller';
import { SubdomainsService } from './subdomains.service';
import { PrismaService } from '../../shared/services/prisma.service';

@Module({
  controllers: [SubdomainsController],
  providers: [PrismaService, SubdomainsService],
})
export class SubdomainsModule {}
