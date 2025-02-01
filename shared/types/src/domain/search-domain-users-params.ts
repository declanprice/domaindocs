import { IsInt, IsNumber, IsNumberString, IsString, Max, Min } from 'class-validator';
import { PagedRequest } from '../pagination';
import { Type } from 'class-transformer';

export class SearchDomainUsersParams extends PagedRequest {
    @IsString()
    search: string;
}
