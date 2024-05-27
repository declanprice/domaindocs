import { Module } from '@nestjs/common';
import { FormsController } from './forms.controller';
import { FormsService } from './forms.service';
import { PrismaService } from '../../shared/prisma.service';

@Module({
    controllers: [FormsController],
    providers: [FormsService, PrismaService],
})
export class FormsModule {}