import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateSubdomainDto {
  @IsString()
  domainId: string;

  @IsString()
  @MinLength(5)
  @MaxLength(50)
  subdomainName: string;
}
