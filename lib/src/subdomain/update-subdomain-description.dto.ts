import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateSubdomainDescriptionDto {
  @IsString()
  @MinLength(0)
  @MaxLength(500)
  description: string;
}
