import { IsOptional, IsString } from 'class-validator';

export class SearchRolesParams {
    @IsString()
    @IsOptional()
    name?: string;
}
