import { Module } from '@nestjs/common';
import { SubdomainsController } from './subdomains.controller';
import { SubdomainsService } from './subdomains.service';
import { PrismaService } from '../../shared/prisma.service';

@Module({
    controllers: [SubdomainsController],
    providers: [SubdomainsService, PrismaService],
})
export class SubdomainsModule {}
