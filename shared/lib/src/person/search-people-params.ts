import { IsOptional, IsString } from 'class-validator';

export class SearchPeopleParams {
    @IsString()
    @IsOptional()
    name?: string;
}
