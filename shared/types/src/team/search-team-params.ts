import { IsOptional, IsString } from 'class-validator';
import { PagedRequest } from '../pagination';

export class SearchTeamParams extends PagedRequest {
    @IsString()
    @IsOptional()
    name?: string;
}
