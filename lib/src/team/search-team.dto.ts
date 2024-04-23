import { IsOptional, IsString } from 'class-validator';

export class SearchTeamDto {
    @IsString()
    @IsOptional()
    subdomainId?: string;

    @IsString()
    @IsOptional()
    name?: string;
}
