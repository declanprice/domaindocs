import { IsString, MaxLength } from 'class-validator';

export class UpdateProjectDescription {
  @IsString()
  @MaxLength(500)
  description: string;
}
