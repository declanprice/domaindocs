import { Module } from '@nestjs/common';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { PrismaService } from '../../shared/services/prisma.service';

@Module({
  controllers: [PeopleController],
  providers: [PrismaService, PeopleService],
})
export class PeopleModule {}
