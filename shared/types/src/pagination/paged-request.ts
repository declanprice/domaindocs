import { IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class PagedRequest {
    @IsInt()
    @Type(() => Number)
    @Min(0)
    offset: number;

    @IsInt()
    @Type(() => Number)
    @Min(5)
    @Max(25)
    take: number;
}
