import { IsOptional, IsString } from 'class-validator';

export class SearchFiles {
    @IsString()
    @IsOptional()
    projectId?: string;
}
