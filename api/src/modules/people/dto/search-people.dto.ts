import { IsOptional, IsString } from 'class-validator';

export class SearchPeopleDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  subdomainId?: string;
}
