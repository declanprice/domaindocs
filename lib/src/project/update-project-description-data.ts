import { IsString, MaxLength } from 'class-validator';

export class UpdateProjectDescriptionData {
    @IsString()
    @MaxLength(500)
    description: string;
}
