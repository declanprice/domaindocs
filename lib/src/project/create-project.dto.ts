import { IsString } from 'class-validator';

export class CreateProjectDto {
    @IsString()
    teamId: string;

    @IsString()
    name: string;
}
