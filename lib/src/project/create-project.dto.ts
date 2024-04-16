import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty({ message: 'You must select a team.' })
  teamId: string;

  @IsString()
  @MinLength(3, { message: 'Project name must be at least 3 characters' })
  @IsNotEmpty()
  name: string;
}
