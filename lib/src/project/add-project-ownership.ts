import { IsString, ValidateIf } from 'class-validator';

export class AddProjectOwnership {
    @IsString()
    @ValidateIf((data) => data.teamId === undefined)
    personId?: string;

    @IsString()
    @ValidateIf((data) => data.projectId === undefined)
    teamId?: string;

    @IsString()
    description: string;
}
