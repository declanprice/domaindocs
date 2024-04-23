import { IsOptional, IsString } from 'class-validator';

export class SearchSecrets {
    @IsString()
    @IsOptional()
    projectId?: string;
}
