import { Module } from '@nestjs/common';
import { DATABASE, DatabaseProvider } from './database.provider';

@Module({
  providers: [DatabaseProvider],
  exports: [DATABASE],
})
export class DatabaseModule {}
