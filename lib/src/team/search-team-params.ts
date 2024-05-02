import { IsOptional, IsString } from 'class-validator';

export class SearchTeamParams {
    @IsString()
    @IsOptional()
    name?: string;
}
