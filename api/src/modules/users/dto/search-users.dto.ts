import { IsOptional, IsString } from 'class-validator';

export class SearchUsersDto {
  @IsString()
  domainId: string;

  @IsString()
  name: string;
}
