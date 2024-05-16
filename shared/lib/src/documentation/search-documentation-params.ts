import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class SearchDocumentationParams {
    @IsString()
    @IsOptional()
    projectId?: string;

    @IsBoolean()
    @IsOptional()
    relevant?: boolean;

    @IsBoolean()
    @IsOptional()
    domainWiki?: boolean;
}
