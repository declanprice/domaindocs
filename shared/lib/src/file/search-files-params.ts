import { IsOptional, IsString } from 'class-validator';

export class SearchFilesParams {
    @IsString()
    @IsOptional()
    domainId?: string;

    @IsString()
    @IsOptional()
    teamId?: string;

    @IsString()
    @IsOptional()
    projectId?: string;
}
