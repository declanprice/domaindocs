import { IsString, ValidateIf } from 'class-validator';

export class AddProjectOwnershipData {
    @IsString()
    @ValidateIf((data) => data.teamId === undefined)
    userId?: string;

    @IsString()
    @ValidateIf((data) => data.projectId === undefined)
    teamId?: string;

    @IsString()
    description: string;
}
