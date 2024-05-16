import { IsOptional, IsString } from 'class-validator';

export class SearchFilesParams {
    @IsString()
    @IsOptional()
    projectId?: string;
}
