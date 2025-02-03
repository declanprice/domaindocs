import { IsOptional, IsString } from 'class-validator';
import { PagedRequest } from '../pagination';

export class SearchSubdomainsParams extends PagedRequest {
    @IsString()
    @IsOptional()
    name?: string;
}
