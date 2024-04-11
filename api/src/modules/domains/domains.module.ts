import { Module } from '@nestjs/common';
import { DomainsController } from './domains.controller';
import { DomainsService } from './domains.service';
import { PrismaService } from '../../shared/services/prisma.service';

@Module({
  controllers: [DomainsController],
  providers: [PrismaService, DomainsService],
})
export class DomainsModule {}
