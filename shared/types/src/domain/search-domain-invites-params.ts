import { IsInt, IsNumber, IsNumberString, IsString, Max, Min } from 'class-validator';
import { PagedRequest } from '../pagination';
import { Type } from 'class-transformer';

export class SearchDomainInvitesParams extends PagedRequest {
    @IsString()
    search: string;
}
