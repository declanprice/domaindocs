import { IsOptional, IsString } from 'class-validator';

export class SearchSkillsParams {
    @IsString()
    @IsOptional()
    name?: string;
}
