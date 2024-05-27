import { Module } from '@nestjs/common';
import { DomainsController } from './domains.controller';
import { DomainsService } from './domains.service';
import { PrismaService } from '../../shared/prisma.service';
import { EmailService } from '../../shared/services/email.service';

@Module({
    controllers: [DomainsController],
    providers: [DomainsService, PrismaService, EmailService],
})
export class DomainsModule {}
