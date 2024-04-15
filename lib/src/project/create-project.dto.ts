import { IsNotEmpty, IsString } from 'class-validator'

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    teamId: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}
