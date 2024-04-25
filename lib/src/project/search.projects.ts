import { IsOptional, IsString } from 'class-validator';

export class SearchProjects {
    @IsString()
    @IsOptional()
    userId?: string;

    @IsString()
    @IsOptional()
    teamId?: string;
}
