import { PagedRequest } from '../pagination';
import { IsOptional, IsString } from 'class-validator';

export class SearchComponentsParams extends PagedRequest {
    @IsString()
    @IsOptional()
    name?: string;
}
