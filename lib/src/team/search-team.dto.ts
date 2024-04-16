import { IsOptional, IsString } from 'class-validator';

export class SearchTeamDto {
  @IsString()
  @IsOptional()
  name?: string;
}
