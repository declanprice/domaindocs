import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database';
import { OrganisationsController } from './organisations.controller';
import { OrganisationsService } from './organisations.service';

@Module({
  imports: [DatabaseModule],
  controllers: [OrganisationsController],
  providers: [OrganisationsService],
})
export class OrganisationsModule {}
