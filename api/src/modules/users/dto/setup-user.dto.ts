import { IsString, MaxLength, MinLength } from 'class-validator';

export class SetupUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  lastName: string;
}