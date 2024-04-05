import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { PrismaService } from '../shared/services/prisma.service';

@Module({
  providers: [PrismaService, UserResolver, UserService],
})
export class UserModule {}
