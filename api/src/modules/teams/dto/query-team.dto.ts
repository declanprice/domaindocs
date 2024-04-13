import { IsOptional, IsString } from 'class-validator';

export class QueryTeamDto {
  @IsString()
  @IsOptional()
  name?: string;
}
