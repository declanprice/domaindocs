import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateSubdomainDto {
  @IsString()
  @MinLength(0)
  @MaxLength(500)
  subdomainName: string;
}
