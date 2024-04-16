import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  teamId: string;

  @IsString()
  @MinLength(3, { message: 'Project name must be at least 3 characters' })
  @IsNotEmpty()
  name: string;
}
