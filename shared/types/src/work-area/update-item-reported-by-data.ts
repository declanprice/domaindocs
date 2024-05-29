import { IsString } from 'class-validator';

export class UpdateItemReportedByData {
    @IsString()
    userId: string;
}
