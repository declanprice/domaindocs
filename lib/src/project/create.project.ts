import { IsString, MinLength } from 'class-validator';

export class CreateProject {
    @IsString()
    @MinLength(3, { message: 'Project name must be at least 3 characters' })
    name: string;
}
