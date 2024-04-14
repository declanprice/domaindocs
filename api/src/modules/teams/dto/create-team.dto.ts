import { IsString } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  subdomainId: string;

  @IsString()
  name: string;
}
