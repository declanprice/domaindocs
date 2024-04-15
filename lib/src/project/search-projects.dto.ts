import { IsOptional, IsString } from 'class-validator';

export class SearchProjectsDto {
    @IsString()
    @IsOptional()
    subdomainId?: string;

    @IsString()
    @IsOptional()
    userId?: string;

    @IsString()
    @IsOptional()
    teamId?: string;
}
