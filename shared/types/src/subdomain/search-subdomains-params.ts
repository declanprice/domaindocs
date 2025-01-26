import { IsOptional, IsString } from 'class-validator';

export class SearchSubdomainsParams {
    @IsString()
    @IsOptional()
    name?: string;
}
