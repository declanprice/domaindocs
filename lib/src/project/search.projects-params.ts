import { IsOptional, IsString } from 'class-validator';

export class SearchProjectsParams {
    @IsString()
    @IsOptional()
    userId?: string;

    @IsString()
    @IsOptional()
    teamId?: string;
}
