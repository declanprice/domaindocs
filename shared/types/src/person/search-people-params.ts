import { IsOptional, IsString } from 'class-validator';
import { PagedRequest } from '../pagination';

export class SearchPeopleParams extends PagedRequest {
    @IsString()
    @IsOptional()
    name?: string;
}
