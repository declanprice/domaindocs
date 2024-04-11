import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateSubdomainDto {
  @IsUUID()
  domainId: string;

  @IsString()
  @MinLength(5)
  @MaxLength(50)
  subdomainName: string;
}
