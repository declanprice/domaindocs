import { Module } from '@nestjs/common';
import { OrganisationsController } from './organisations.controller';
import { OrganisationsService } from './organisations.service';
import { PrismaService } from '../global';

@Module({
  controllers: [OrganisationsController],
  providers: [PrismaService, OrganisationsService],
})
export class OrganisationsModule {}
