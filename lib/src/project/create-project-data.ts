import { IsString, MinLength } from 'class-validator';

export class CreateProjectData {
    @IsString()
    @MinLength(3, { message: 'Project name must be at least 3 characters' })
    name: string;
}
