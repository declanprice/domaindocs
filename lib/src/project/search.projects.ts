import { IsOptional, IsString } from 'class-validator';

export class SearchProjects {
  @IsString()
  @IsOptional()
  subdomainId?: string;

  @IsString()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsOptional()
  teamId?: string;
}
