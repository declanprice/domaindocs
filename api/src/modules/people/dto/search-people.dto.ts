import { IS_BOOLEAN, IsBoolean, IsOptional, IsString } from 'class-validator';

export class SearchPeopleDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  subdomainId?: string;
}
